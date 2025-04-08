
import { supabase } from "@/integrations/supabase/client";
import { ActivePresentation, UpcomingPresentation } from "@/types/dashboard";

export async function getPresentations() {
  const { data, error } = await supabase
    .from('presentations')
    .select('*');
  
  if (error) {
    console.error('Error fetching presentations:', error);
    throw error;
  }
  
  return data;
}

export async function getActivePresentations() {
  const { data, error } = await supabase
    .from('presentations')
    .select(`
      *,
      clients:presentation_clients(
        client:clients(*)
      )
    `)
    .eq('status', 'active');
  
  if (error) {
    console.error('Error fetching active presentations:', error);
    throw error;
  }
  
  // Transform the data to match the ActivePresentation type
  const activePresentations: ActivePresentation[] = data.map(presentation => {
    const clients = presentation.clients.map((pc: any) => pc.client);
    return {
      id: presentation.id,
      title: presentation.title,
      presenter: presentation.presenter,
      startTime: new Date(presentation.start_time),
      status: presentation.status as 'scheduled' | 'active' | 'completed' | 'cancelled',
      roomNumber: presentation.room_number,
      waveTime: presentation.wave_time,
      clients: clients
    };
  });
  
  return activePresentations;
}

export async function getUpcomingPresentations() {
  const { data, error } = await supabase
    .from('presentations')
    .select(`
      *,
      clients:presentation_clients(count)
    `)
    .eq('status', 'scheduled');
  
  if (error) {
    console.error('Error fetching upcoming presentations:', error);
    throw error;
  }
  
  // Transform the data to match the UpcomingPresentation type
  const upcomingPresentations: UpcomingPresentation[] = data.map(presentation => {
    return {
      id: presentation.id,
      title: presentation.title,
      presenter: presentation.presenter,
      startTime: new Date(presentation.start_time),
      status: presentation.status as 'scheduled' | 'active' | 'completed' | 'cancelled',
      roomNumber: presentation.room_number,
      waveTime: presentation.wave_time,
      clients: presentation.clients[0].count
    };
  });
  
  return upcomingPresentations;
}

export async function createPresentation(presentation: Omit<ActivePresentation | UpcomingPresentation, 'id'>) {
  const { data, error } = await supabase
    .from('presentations')
    .insert([{
      title: presentation.title,
      presenter: presentation.presenter,
      start_time: presentation.startTime.toISOString(),
      status: presentation.status || 'scheduled',
      room_number: presentation.roomNumber,
      wave_time: presentation.waveTime
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating presentation:', error);
    throw error;
  }
  
  return data;
}
