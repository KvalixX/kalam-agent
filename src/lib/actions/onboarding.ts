'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function completeOnboarding(formData: {
  platform: string;
  agentStyle: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 1. Update merchant profile
  const { error: merchantError } = await supabase
    .from('merchants')
    .update({
      onboarding_complete: true,
      sector: formData.platform,
    })
    .eq('id', user.id);

  if (merchantError) {
    console.error('Error updating merchant:', merchantError);
    return { error: merchantError.message };
  }

  // 2. Create agent config
  // Map agentStyle to language/tone
  let language = 'darija';
  let tone = 'friendly';

  if (formData.agentStyle === 'Professional Mix') {
    language = 'mix';
    tone = 'professional';
  } else if (formData.agentStyle === 'Direct Sales') {
    language = 'darija';
    tone = 'direct';
  }

  const { error: agentError } = await supabase.from('agent_configs').insert({
    merchant_id: user.id,
    agent_name: 'Kalam Assistant',
    language,
    tone,
    welcome_message: 'Assalam 3likom! Labas? Kif imkan lia n3awnk lyoum? ✨',
  });

  if (agentError) {
    console.error('Error creating agent config:', agentError);
    return { error: agentError.message };
  }

  return { success: true };
}
