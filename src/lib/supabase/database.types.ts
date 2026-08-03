export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          name: string
          organization_id: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name: string
          organization_id: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      homepage_featured_products: {
        Row: {
          created_at: string
          display_order: number
          id: string
          organization_id: string
          product_id: string
          section_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          organization_id: string
          product_id: string
          section_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          organization_id?: string
          product_id?: string
          section_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "homepage_featured_products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "homepage_featured_products_product_tenant_fkey"
            columns: ["organization_id", "product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["organization_id", "id"]
          },
          {
            foreignKeyName: "homepage_featured_products_section_tenant_fkey"
            columns: ["organization_id", "section_id"]
            isOneToOne: false
            referencedRelation: "homepage_sections"
            referencedColumns: ["organization_id", "id"]
          },
        ]
      }
      homepage_sections: {
        Row: {
          created_at: string
          display_order: number
          eyebrow: string
          id: string
          is_active: boolean
          organization_id: string
          section_key: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          eyebrow: string
          id?: string
          is_active?: boolean
          organization_id: string
          section_key: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          eyebrow?: string
          id?: string
          is_active?: boolean
          organization_id?: string
          section_key?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "homepage_sections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      homepage_settings: {
        Row: {
          created_at: string
          hero_button_label: string
          hero_button_url: string
          hero_image_path: string
          hero_subtitle: string
          hero_title: string
          id: string
          is_active: boolean
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          hero_button_label: string
          hero_button_url: string
          hero_image_path: string
          hero_subtitle: string
          hero_title: string
          id?: string
          is_active?: boolean
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          hero_button_label?: string
          hero_button_url?: string
          hero_image_path?: string
          hero_subtitle?: string
          hero_title?: string
          id?: string
          is_active?: boolean
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "homepage_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          alt_text: string
          bucket_id: string
          caption: string | null
          created_at: string
          deleted_at: string | null
          file_size_bytes: number
          height: number
          id: string
          mime_type: string
          organization_id: string
          original_filename: string
          storage_path: string
          updated_at: string
          uploaded_by: string | null
          width: number
        }
        Insert: {
          alt_text: string
          bucket_id?: string
          caption?: string | null
          created_at?: string
          deleted_at?: string | null
          file_size_bytes: number
          height: number
          id: string
          mime_type: string
          organization_id: string
          original_filename: string
          storage_path: string
          updated_at?: string
          uploaded_by?: string | null
          width: number
        }
        Update: {
          alt_text?: string
          bucket_id?: string
          caption?: string | null
          created_at?: string
          deleted_at?: string | null
          file_size_bytes?: number
          height?: number
          id?: string
          mime_type?: string
          organization_id?: string
          original_filename?: string
          storage_path?: string
          updated_at?: string
          uploaded_by?: string | null
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      member_roles: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          member_id: string
          organization_id: string
          role_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          member_id: string
          organization_id: string
          role_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          member_id?: string
          organization_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_roles_member_tenant_fkey"
            columns: ["organization_id", "member_id"]
            isOneToOne: false
            referencedRelation: "organization_members"
            referencedColumns: ["organization_id", "id"]
          },
          {
            foreignKeyName: "member_roles_role_tenant_fkey"
            columns: ["organization_id", "role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["organization_id", "id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          organization_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          organization_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          organization_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string
          id: string
          key: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description: string
          id?: string
          key: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string
          id?: string
          key?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          deleted_at: string | null
          display_order: number
          id: string
          is_primary: boolean
          media_asset_id: string
          organization_id: string
          product_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          display_order?: number
          id?: string
          is_primary?: boolean
          media_asset_id: string
          organization_id: string
          product_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          display_order?: number
          id?: string
          is_primary?: boolean
          media_asset_id?: string
          organization_id?: string
          product_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_media_tenant_fkey"
            columns: ["organization_id", "media_asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["organization_id", "id"]
          },
          {
            foreignKeyName: "product_images_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_product_tenant_fkey"
            columns: ["organization_id", "product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["organization_id", "id"]
          },
        ]
      }
      products: {
        Row: {
          base_price_minor: number
          category_id: string
          created_at: string
          deleted_at: string | null
          display_order: number
          full_description: string | null
          id: string
          is_active: boolean
          name: string
          organization_id: string
          published_at: string | null
          short_description: string | null
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          base_price_minor: number
          category_id: string
          created_at?: string
          deleted_at?: string | null
          display_order?: number
          full_description?: string | null
          id?: string
          is_active?: boolean
          name: string
          organization_id: string
          published_at?: string | null
          short_description?: string | null
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          base_price_minor?: number
          category_id?: string
          created_at?: string
          deleted_at?: string | null
          display_order?: number
          full_description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string
          published_at?: string | null
          short_description?: string | null
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_tenant_fkey"
            columns: ["organization_id", "category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["organization_id", "id"]
          },
          {
            foreignKeyName: "products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          deleted_at: string | null
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          organization_id: string
          permission_id: string
          role_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          organization_id: string
          permission_id: string
          role_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          organization_id?: string
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_tenant_fkey"
            columns: ["organization_id", "role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["organization_id", "id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          is_system: boolean
          key: string
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_system?: boolean
          key: string
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_system?: boolean
          key?: string
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_alveto_published_homepage: {
        Args: never
        Returns: {
          featured_product_base_price_minor: number
          featured_product_description: string
          featured_product_display_order: number
          featured_product_id: string
          featured_product_name: string
          featured_product_slug: string
          featured_section_display_order: number
          featured_section_eyebrow: string
          featured_section_title: string
          hero_button_label: string
          hero_button_url: string
          hero_image_path: string
          hero_subtitle: string
          hero_title: string
          image_alt_text: string
          image_storage_path: string
        }[]
      }
      get_alveto_published_menu: {
        Args: never
        Returns: {
          category_display_order: number
          category_id: string
          category_name: string
          category_slug: string
          image_alt_text: string
          image_storage_path: string
          product_base_price_minor: number
          product_description: string
          product_display_order: number
          product_id: string
          product_name: string
          product_slug: string
        }[]
      }
      has_permission: {
        Args: { target_organization_id: string; target_permission_key: string }
        Returns: boolean
      }
      is_alveto_published_product_image: {
        Args: { target_bucket_id: string; target_object_name: string }
        Returns: boolean
      }
      is_organization_member: {
        Args: { target_organization_id: string }
        Returns: boolean
      }
      move_product_image: {
        Args: {
          target_direction: string
          target_organization_id: string
          target_product_id: string
          target_product_image_id: string
        }
        Returns: undefined
      }
      register_product_image: {
        Args: {
          target_alt_text: string
          target_caption?: string
          target_file_size_bytes: number
          target_height: number
          target_media_asset_id: string
          target_mime_type: string
          target_organization_id: string
          target_original_filename: string
          target_product_id: string
          target_storage_path: string
          target_width: number
        }
        Returns: string
      }
      resolve_active_organization: {
        Args: { requested_organization_id?: string }
        Returns: {
          organization_id: string
          organization_name: string
          organization_slug: string
        }[]
      }
      save_homepage_content: {
        Args: {
          target_featured_display_order: number
          target_featured_eyebrow: string
          target_featured_is_active: boolean
          target_featured_product_ids?: string[]
          target_featured_title: string
          target_hero_button_label: string
          target_hero_button_url: string
          target_hero_image_path: string
          target_hero_subtitle: string
          target_hero_title: string
          target_is_active: boolean
          target_organization_id: string
        }
        Returns: undefined
      }
      set_product_image_primary: {
        Args: {
          target_organization_id: string
          target_product_id: string
          target_product_image_id: string
        }
        Returns: undefined
      }
      soft_delete_product_image: {
        Args: {
          target_organization_id: string
          target_product_id: string
          target_product_image_id: string
        }
        Returns: undefined
      }
      update_product_image_metadata: {
        Args: {
          target_alt_text: string
          target_caption?: string
          target_organization_id: string
          target_product_id: string
          target_product_image_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
