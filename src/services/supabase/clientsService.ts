
import { supabase } from "@/integrations/supabase/client";
import { Client } from "@/types/dashboard";

export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*');
  
  if (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
  
  return data as Client[];
}

export async function getClientById(id: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching client with id ${id}:`, error);
    throw error;
  }
  
  return data as Client;
}

export async function updateClientStatus(clientId: string, status: 'engaged' | 'distracted' | 'away') {
  const { data, error } = await supabase
    .from('clients')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', clientId)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating client status for id ${clientId}:`, error);
    throw error;
  }
  
  return data as Client;
}

export async function createClient(client: Omit<Client, 'id'>) {
  const { data, error } = await supabase
    .from('clients')
    .insert([client])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating client:', error);
    throw error;
  }
  
  return data as Client;
}
