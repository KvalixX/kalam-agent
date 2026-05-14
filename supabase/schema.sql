-- ============================================================
-- Kalam AI — Full Clean Reset (run this in Supabase SQL Editor)
-- Drops everything first, then recreates from scratch
-- ============================================================

-- 1. Drop tables (CASCADE removes policies + triggers automatically)
DROP TABLE IF EXISTS conversations  CASCADE;
DROP TABLE IF EXISTS customers      CASCADE;
DROP TABLE IF EXISTS agent_configs  CASCADE;
DROP TABLE IF EXISTS merchants      CASCADE;

-- 2. Drop auth trigger + functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user()   CASCADE;
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;

-- ============================================================
-- 3. Recreate tables
-- ============================================================
CREATE TABLE merchants (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL DEFAULT 'Ma Boutique',
  whatsapp_number TEXT,
  sector TEXT,
  orders_per_day TEXT,
  country TEXT DEFAULT 'MA',
  plan TEXT DEFAULT 'trial',
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE agent_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  agent_name TEXT DEFAULT 'Kalam Assistant',
  language TEXT DEFAULT 'darija',
  tone TEXT DEFAULT 'friendly',
  welcome_message TEXT,
  active_24h BOOLEAN DEFAULT TRUE,
  active_hours_start INT DEFAULT 0,
  active_hours_end INT DEFAULT 24,
  return_policy TEXT,
  delivery_policy TEXT,
  escalation_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  phone TEXT NOT NULL,
  name TEXT,
  email TEXT,
  preferred_language TEXT DEFAULT 'darija',
  segment TEXT DEFAULT 'new',
  total_orders INT DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  churn_score INT DEFAULT 0 CHECK (churn_score >= 0 AND churn_score <= 100),
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_interaction_at TIMESTAMPTZ,
  UNIQUE(merchant_id, phone)
);

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  channel TEXT DEFAULT 'whatsapp',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'escalated', 'resolved', 'closed')),
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. Enable RLS
-- ============================================================
ALTER TABLE merchants      ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_configs  ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations  ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 5. RLS Policies
-- ============================================================
CREATE POLICY "merchants_own_data"     ON merchants     FOR ALL USING (auth.uid() = id);
CREATE POLICY "agent_configs_own_data" ON agent_configs FOR ALL USING (auth.uid() = merchant_id);
CREATE POLICY "customers_own_data"     ON customers     FOR ALL USING (auth.uid() = merchant_id);
CREATE POLICY "conversations_own_data" ON conversations FOR ALL USING (auth.uid() = merchant_id);

-- ============================================================
-- 6. Trigger: auto-create merchant profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.merchants (id, business_name, whatsapp_number)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'business_name', 'Ma Boutique'),
    COALESCE(NEW.raw_user_meta_data->>'whatsapp_number', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 7. Trigger: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER merchants_updated_at
  BEFORE UPDATE ON merchants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER agent_configs_updated_at
  BEFORE UPDATE ON agent_configs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
