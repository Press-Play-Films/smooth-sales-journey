export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          assigned_agent: string | null
          city: string | null
          created_at: string | null
          department: string | null
          id: string
          image_url: string | null
          location: string | null
          names: string
          presentation_time: string | null
          room_number: string | null
          state: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          assigned_agent?: string | null
          city?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          names: string
          presentation_time?: string | null
          room_number?: string | null
          state?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          assigned_agent?: string | null
          city?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          names?: string
          presentation_time?: string | null
          room_number?: string | null
          state?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      presentation_clients: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          presentation_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          presentation_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          presentation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "presentation_clients_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "presentation_clients_presentation_id_fkey"
            columns: ["presentation_id"]
            isOneToOne: false
            referencedRelation: "presentations"
            referencedColumns: ["id"]
          },
        ]
      }
      presentations: {
        Row: {
          created_at: string | null
          end_time: string | null
          id: string
          presenter: string
          room_number: string | null
          start_time: string
          status: string
          title: string
          updated_at: string | null
          wave_time: string | null
        }
        Insert: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          presenter: string
          room_number?: string | null
          start_time: string
          status?: string
          title: string
          updated_at?: string | null
          wave_time?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          presenter?: string
          room_number?: string | null
          start_time?: string
          status?: string
          title?: string
          updated_at?: string | null
          wave_time?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          full_name: string | null
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sales: {
        Row: {
          amount: number
          client_id: string
          created_at: string | null
          id: string
          package_type: string
          payment_method: string
          presentation_id: string | null
          room_number: string | null
          sales_executive: string | null
          to_manager: string | null
          transaction_notes: string | null
          wave_time: string | null
        }
        Insert: {
          amount: number
          client_id: string
          created_at?: string | null
          id?: string
          package_type: string
          payment_method: string
          presentation_id?: string | null
          room_number?: string | null
          sales_executive?: string | null
          to_manager?: string | null
          transaction_notes?: string | null
          wave_time?: string | null
        }
        Update: {
          amount?: number
          client_id?: string
          created_at?: string | null
          id?: string
          package_type?: string
          payment_method?: string
          presentation_id?: string | null
          room_number?: string | null
          sales_executive?: string | null
          to_manager?: string | null
          transaction_notes?: string | null
          wave_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_presentation_id_fkey"
            columns: ["presentation_id"]
            isOneToOne: false
            referencedRelation: "presentations"
            referencedColumns: ["id"]
          },
        ]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
