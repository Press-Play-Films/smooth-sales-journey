
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

// Sign up with email and password
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  });
  
  if (error) {
    console.error('Error signing up:', error);
    throw error;
  }
  
  return data;
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }
  
  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
  
  return true;
}

// Get current session
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting session:', error);
    throw error;
  }
  
  return data.session;
}

// Get current user
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting user:', error);
    throw error;
  }
  
  return data.user;
}

// Get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
  
  return data;
}
