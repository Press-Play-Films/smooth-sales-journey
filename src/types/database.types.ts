
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          names: string
          location: string | null
          city: string | null
          state: string | null
          status: 'engaged' | 'distracted' | 'away'
          department: string | null
          room_number: string | null
          assigned_agent: string | null
          presentation_time: string | null
          image_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          names: string
          location?: string | null
          city?: string | null
          state?: string | null
          status?: 'engaged' | 'distracted' | 'away'
          department?: string | null
          room_number?: string | null
          assigned_agent?: string | null
          presentation_time?: string | null
          image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          names?: string
          location?: string | null
          city?: string | null
          state?: string | null
          status?: 'engaged' | 'distracted' | 'away'
          department?: string | null
          room_number?: string | null
          assigned_agent?: string | null
          presentation_time?: string | null
          image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      presentations: {
        Row: {
          id: string
          title: string
          presenter: string
          start_time: string
          end_time: string | null
          status: 'scheduled' | 'active' | 'completed' | 'cancelled'
          room_number: string | null
          wave_time: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          presenter: string
          start_time: string
          end_time?: string | null
          status?: 'scheduled' | 'active' | 'completed' | 'cancelled'
          room_number?: string | null
          wave_time?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          presenter?: string
          start_time?: string
          end_time?: string | null
          status?: 'scheduled' | 'active' | 'completed' | 'cancelled'
          room_number?: string | null
          wave_time?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      presentation_clients: {
        Row: {
          id: string
          presentation_id: string
          client_id: string
          created_at: string | null
        }
        Insert: {
          id?: string
          presentation_id: string
          client_id: string
          created_at?: string | null
        }
        Update: {
          id?: string
          presentation_id?: string
          client_id?: string
          created_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: string
          department: string | null
          avatar_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: string
          department?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: string
          department?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      sales: {
        Row: {
          id: string
          presentation_id: string | null
          client_id: string
          package_type: string
          payment_method: string
          sales_executive: string | null
          to_manager: string | null
          amount: number
          transaction_notes: string | null
          wave_time: string | null
          room_number: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          presentation_id?: string | null
          client_id: string
          package_type: string
          payment_method: string
          sales_executive?: string | null
          to_manager?: string | null
          amount: number
          transaction_notes?: string | null
          wave_time?: string | null
          room_number?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          presentation_id?: string | null
          client_id?: string
          package_type?: string
          payment_method?: string
          sales_executive?: string | null
          to_manager?: string | null
          amount?: number
          transaction_notes?: string | null
          wave_time?: string | null
          room_number?: string | null
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
