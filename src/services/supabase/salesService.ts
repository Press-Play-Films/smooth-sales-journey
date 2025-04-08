
import { supabase } from "@/integrations/supabase/client";
import { Sale } from "@/types/dashboard";

export async function getSales() {
  const { data, error } = await supabase
    .from('sales')
    .select(`
      *,
      client:clients(names)
    `);
  
  if (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
  
  // Transform the data to match the Sale type
  const sales: Sale[] = data.map(sale => {
    return {
      id: sale.id,
      presentationId: sale.presentation_id,
      clientId: sale.client_id,
      clientNames: sale.client.names,
      packageType: sale.package_type,
      paymentMethod: sale.payment_method,
      salesExecutive: sale.sales_executive,
      toManager: sale.to_manager,
      amount: sale.amount,
      transactionNotes: sale.transaction_notes,
      timestamp: new Date(sale.created_at),
      waveTime: sale.wave_time,
      roomNumber: sale.room_number
    };
  });
  
  return sales;
}

export async function createSale(sale: Omit<Sale, 'id' | 'timestamp'>) {
  const { data, error } = await supabase
    .from('sales')
    .insert([{
      presentation_id: sale.presentationId,
      client_id: sale.clientId,
      package_type: sale.packageType,
      payment_method: sale.paymentMethod,
      sales_executive: sale.salesExecutive,
      to_manager: sale.toManager,
      amount: sale.amount,
      transaction_notes: sale.transactionNotes,
      wave_time: sale.waveTime,
      room_number: sale.roomNumber
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
  
  return data;
}
