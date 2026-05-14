'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export type AuthState = {
  error?: string;
  success?: boolean;
} | null;

// ── Sign Up ──────────────────────────────────────────────────
export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const businessName = formData.get('business_name') as string;
  const whatsappNumber = formData.get('whatsapp_number') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!businessName || !email || !password) {
    return { error: 'Veuillez remplir tous les champs.' };
  }

  if (password.length < 6) {
    return { error: 'Le mot de passe doit contenir au moins 6 caractères.' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        business_name: businessName,
        whatsapp_number: whatsappNumber,
      },
    },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Un compte existe déjà avec cet email. Connectez-vous.' };
    }
    return { error: error.message };
  }

  redirect('/onboarding');
}

// ── Sign In ──────────────────────────────────────────────────
export async function signIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Veuillez remplir tous les champs.' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (
      error.message.includes('Invalid login credentials') ||
      error.message.includes('invalid_credentials')
    ) {
      return { error: 'Email ou mot de passe incorrect.' };
    }
    return { error: error.message };
  }

  redirect('/dashboard');
}

// ── Sign Out ─────────────────────────────────────────────────
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
