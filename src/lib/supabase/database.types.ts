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
  public: {
    Tables: {
      builder_groups: {
        Row: {
          builder_id: string
          created_at: string
          deleted_at: string | null
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          is_required: boolean
          maximum_selections: number
          minimum_selections: number
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          builder_id: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          is_required?: boolean
          maximum_selections?: number
          minimum_selections?: number
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          builder_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          is_required?: boolean
          maximum_selections?: number
          minimum_selections?: number
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "builder_groups_organization_id_builder_id_fkey"
            columns: ["organization_id", "builder_id"]
            isOneToOne: false
            referencedRelation: "builders"
            referencedColumns: ["organization_id", "id"]
          },
          {
            foreignKeyName: "builder_groups_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      builder_options: {
        Row: {
          builder_group_id: string
          builder_id: string
          created_at: string
          deleted_at: string | null
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          media_asset_id: string | null
          name: string
          organization_id: string
          price_adjustment_minor: number
          updated_at: string
        }
        Insert: {
          builder_group_id: string
          builder_id: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          media_asset_id?: string | null
          name: string
          organization_id: string
          price_adjustment_minor?: number
          updated_at?: string
        }
        Update: {
          builder_group_id?: string
          builder_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          media_asset_id?: string | null
          name?: string
          organization_id?: string
          price_adjustment_minor?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "builder_options_organization_id_builder_id_builder_group_i_fkey"
            columns: ["organization_id", "builder_id", "builder_group_id"]
            isOneToOne: false
            referencedRelation: "builder_groups"
            referencedColumns: ["organization_id", "builder_id", "id"]
          },
          {
            foreignKeyName: "builder_options_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "builder_options_organization_id_media_asset_id_fkey"
            columns: ["organization_id", "media_asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["organization_id", "id"]
          },
        ]
      }
      builders: {
        Row: {
          base_price_minor: number
          created_at: string
          deleted_at: string | null
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          name: string
          organization_id: string
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          base_price_minor?: number
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name: string
          organization_id: string
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          base_price_minor?: number
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "builders_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      business_hours: {
        Row: {
          closes_at: string | null
          created_at: string
          day_of_week: number
          id: string
          is_active: boolean
          is_closed: boolean
          opens_at: string | null
          organization_id: string
          updated_at: string
        }
        Insert: {
          closes_at?: string | null
          created_at?: string
          day_of_week: number
          id?: string
          is_active?: boolean
          is_closed?: boolean
          opens_at?: string | null
          organization_id: string
          updated_at?: string
        }
        Update: {
          closes_at?: string | null
          created_at?: string
          day_of_week?: number
          id?: string
          is_active?: boolean
          is_closed?: boolean
          opens_at?: string | null
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_hours_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
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
      contact_settings: {
        Row: {
          address_line: string | null
          city: string | null
          country: string | null
          country_code: string | null
          created_at: string
          google_maps_url: string | null
          id: string
          is_active: boolean
          organization_id: string
          public_email: string | null
          public_phone: string | null
          updated_at: string
        }
        Insert: {
          address_line?: string | null
          city?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string
          google_maps_url?: string | null
          id?: string
          is_active?: boolean
          organization_id: string
          public_email?: string | null
          public_phone?: string | null
          updated_at?: string
        }
        Update: {
          address_line?: string | null
          city?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string
          google_maps_url?: string | null
          id?: string
          is_active?: boolean
          organization_id?: string
          public_email?: string | null
          public_phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      footer_settings: {
        Row: {
          copyright_text: string
          created_at: string
          id: string
          is_active: boolean
          legal_links: Json
          navigation_links: Json
          organization_id: string
          updated_at: string
        }
        Insert: {
          copyright_text: string
          created_at?: string
          id?: string
          is_active?: boolean
          legal_links?: Json
          navigation_links?: Json
          organization_id: string
          updated_at?: string
        }
        Update: {
          copyright_text?: string
          created_at?: string
          id?: string
          is_active?: boolean
          legal_links?: Json
          navigation_links?: Json
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "footer_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_collections: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          organization_id: string
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          organization_id: string
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          organization_id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_collections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_items: {
        Row: {
          alt_text: string
          caption: string | null
          collection_id: string
          created_at: string
          deleted_at: string | null
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          media_asset_id: string
          organization_id: string
          published_at: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          alt_text: string
          caption?: string | null
          collection_id: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          media_asset_id: string
          organization_id: string
          published_at?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          alt_text?: string
          caption?: string | null
          collection_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          media_asset_id?: string
          organization_id?: string
          published_at?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_items_collection_tenant_fkey"
            columns: ["organization_id", "collection_id"]
            isOneToOne: false
            referencedRelation: "gallery_collections"
            referencedColumns: ["organization_id", "id"]
          },
          {
            foreignKeyName: "gallery_items_media_tenant_fkey"
            columns: ["organization_id", "media_asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["organization_id", "id"]
          },
          {
            foreignKeyName: "gallery_items_organization_id_fkey"
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
      reservation_settings: {
        Row: {
          advance_booking_notice_minutes: number | null
          booking_instructions: string | null
          created_at: string
          email: string | null
          id: string
          maximum_party_size: number | null
          minimum_party_size: number | null
          organization_id: string
          phone_number: string | null
          primary_cta_label: string
          reservation_url: string | null
          reservations_enabled: boolean
          secondary_message: string | null
          updated_at: string
          whatsapp_contact: string | null
        }
        Insert: {
          advance_booking_notice_minutes?: number | null
          booking_instructions?: string | null
          created_at?: string
          email?: string | null
          id?: string
          maximum_party_size?: number | null
          minimum_party_size?: number | null
          organization_id: string
          phone_number?: string | null
          primary_cta_label: string
          reservation_url?: string | null
          reservations_enabled?: boolean
          secondary_message?: string | null
          updated_at?: string
          whatsapp_contact?: string | null
        }
        Update: {
          advance_booking_notice_minutes?: number | null
          booking_instructions?: string | null
          created_at?: string
          email?: string | null
          id?: string
          maximum_party_size?: number | null
          minimum_party_size?: number | null
          organization_id?: string
          phone_number?: string | null
          primary_cta_label?: string
          reservation_url?: string | null
          reservations_enabled?: boolean
          secondary_message?: string | null
          updated_at?: string
          whatsapp_contact?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservation_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
      seo_settings: {
        Row: {
          canonical_url: string | null
          created_at: string
          id: string
          meta_description: string | null
          open_graph_description: string | null
          open_graph_media_asset_id: string | null
          open_graph_title: string | null
          organization_id: string
          page_key: string
          robots_follow: boolean | null
          robots_index: boolean | null
          title: string | null
          twitter_card_type: string | null
          twitter_description: string | null
          twitter_media_asset_id: string | null
          twitter_title: string | null
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          id?: string
          meta_description?: string | null
          open_graph_description?: string | null
          open_graph_media_asset_id?: string | null
          open_graph_title?: string | null
          organization_id: string
          page_key: string
          robots_follow?: boolean | null
          robots_index?: boolean | null
          title?: string | null
          twitter_card_type?: string | null
          twitter_description?: string | null
          twitter_media_asset_id?: string | null
          twitter_title?: string | null
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          id?: string
          meta_description?: string | null
          open_graph_description?: string | null
          open_graph_media_asset_id?: string | null
          open_graph_title?: string | null
          organization_id?: string
          page_key?: string
          robots_follow?: boolean | null
          robots_index?: boolean | null
          title?: string | null
          twitter_card_type?: string | null
          twitter_description?: string | null
          twitter_media_asset_id?: string | null
          twitter_title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_settings_open_graph_media_tenant_fkey"
            columns: ["organization_id", "open_graph_media_asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["organization_id", "id"]
          },
          {
            foreignKeyName: "seo_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_settings_twitter_media_tenant_fkey"
            columns: ["organization_id", "twitter_media_asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["organization_id", "id"]
          },
        ]
      }
      site_settings: {
        Row: {
          business_name: string
          created_at: string
          id: string
          is_active: boolean
          organization_id: string
          short_brand_description: string
          temporarily_closed: boolean
          updated_at: string
        }
        Insert: {
          business_name: string
          created_at?: string
          id?: string
          is_active?: boolean
          organization_id: string
          short_brand_description: string
          temporarily_closed?: boolean
          updated_at?: string
        }
        Update: {
          business_name?: string
          created_at?: string
          id?: string
          is_active?: boolean
          organization_id?: string
          short_brand_description?: string
          temporarily_closed?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      social_links: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          organization_id: string
          platform: string
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          organization_id: string
          platform: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          organization_id?: string
          platform?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_links_organization_id_fkey"
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
      get_alveto_public_reservation_settings: {
        Args: never
        Returns: {
          advance_booking_notice_minutes: number
          booking_instructions: string
          email: string
          maximum_party_size: number
          minimum_party_size: number
          phone_number: string
          primary_cta_label: string
          reservation_url: string
          reservations_enabled: boolean
          secondary_message: string
          whatsapp_contact: string
        }[]
      }
      get_alveto_public_seo: {
        Args: never
        Returns: {
          canonical_url: string
          meta_description: string
          open_graph_description: string
          open_graph_image_alt_text: string
          open_graph_image_height: number
          open_graph_image_mime_type: string
          open_graph_image_storage_path: string
          open_graph_image_width: number
          open_graph_media_asset_id: string
          open_graph_title: string
          page_key: string
          robots_follow: boolean
          robots_index: boolean
          title: string
          twitter_card_type: string
          twitter_description: string
          twitter_image_alt_text: string
          twitter_image_height: number
          twitter_image_mime_type: string
          twitter_image_storage_path: string
          twitter_image_width: number
          twitter_media_asset_id: string
          twitter_title: string
        }[]
      }
      get_alveto_public_site_settings: {
        Args: never
        Returns: {
          address_line: string
          business_hours: Json
          business_name: string
          city: string
          country: string
          country_code: string
          footer_copyright_text: string
          footer_legal_links: Json
          footer_navigation_links: Json
          google_maps_url: string
          public_email: string
          public_phone: string
          short_brand_description: string
          social_links: Json
          temporarily_closed: boolean
        }[]
      }
      get_alveto_published_builders: {
        Args: never
        Returns: {
          builder_base_price_minor: number
          builder_description: string
          builder_display_order: number
          builder_id: string
          builder_name: string
          builder_slug: string
          builder_title: string
          group_description: string
          group_display_order: number
          group_id: string
          group_is_required: boolean
          group_maximum_selections: number
          group_minimum_selections: number
          group_name: string
          option_description: string
          option_display_order: number
          option_id: string
          option_name: string
          option_price_adjustment_minor: number
        }[]
      }
      get_alveto_published_gallery: {
        Args: never
        Returns: {
          collection_description: string
          collection_display_order: number
          collection_id: string
          collection_title: string
          image_height: number
          image_mime_type: string
          image_storage_path: string
          image_width: number
          item_alt_text: string
          item_caption: string
          item_description: string
          item_display_order: number
          item_id: string
          item_title: string
        }[]
      }
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
      is_alveto_published_gallery_image: {
        Args: { target_bucket_id: string; target_object_name: string }
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
      move_builder_entity: {
        Args: {
          target_direction: string
          target_entity: string
          target_id: string
          target_organization_id: string
        }
        Returns: undefined
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
      restore_gallery_item: {
        Args: { target_item_id: string; target_organization_id: string }
        Returns: undefined
      }
      save_builder: {
        Args: {
          target_base_price_minor: number
          target_description: string
          target_display_order: number
          target_id: string
          target_is_active: boolean
          target_name: string
          target_organization_id: string
          target_slug: string
          target_status: string
          target_title: string
        }
        Returns: string
      }
      save_builder_group: {
        Args: {
          target_builder_id: string
          target_description: string
          target_display_order: number
          target_id: string
          target_is_active: boolean
          target_is_required: boolean
          target_maximum_selections: number
          target_minimum_selections: number
          target_name: string
          target_organization_id: string
        }
        Returns: string
      }
      save_builder_option: {
        Args: {
          target_builder_group_id: string
          target_builder_id: string
          target_description: string
          target_display_order: number
          target_id: string
          target_is_active: boolean
          target_media_asset_id: string
          target_name: string
          target_organization_id: string
          target_price_adjustment_minor: number
        }
        Returns: string
      }
      save_contact_settings: {
        Args: {
          target_address_line: string
          target_business_hours: Json
          target_city: string
          target_country: string
          target_country_code: string
          target_google_maps_url: string
          target_is_active: boolean
          target_organization_id: string
          target_public_email: string
          target_public_phone: string
          target_social_links: Json
        }
        Returns: string
      }
      save_footer_settings: {
        Args: {
          target_copyright_text: string
          target_is_active: boolean
          target_legal_links: Json
          target_navigation_links: Json
          target_organization_id: string
        }
        Returns: string
      }
      save_gallery_item: {
        Args: {
          target_alt_text: string
          target_caption: string
          target_collection_id: string
          target_description: string
          target_display_order: number
          target_is_active: boolean
          target_item_id?: string
          target_media_asset_id: string
          target_organization_id: string
          target_status: string
          target_title: string
        }
        Returns: string
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
      save_reservation_settings: {
        Args: {
          target_advance_booking_notice_minutes: number
          target_booking_instructions: string
          target_email: string
          target_maximum_party_size: number
          target_minimum_party_size: number
          target_organization_id: string
          target_phone_number: string
          target_primary_cta_label: string
          target_reservation_url: string
          target_reservations_enabled: boolean
          target_secondary_message: string
          target_whatsapp_contact: string
        }
        Returns: string
      }
      save_seo_settings: {
        Args: {
          target_canonical_url: string
          target_meta_description: string
          target_open_graph_description: string
          target_open_graph_media_asset_id: string
          target_open_graph_title: string
          target_organization_id: string
          target_page_key: string
          target_robots_follow: boolean
          target_robots_index: boolean
          target_title: string
          target_twitter_card_type: string
          target_twitter_description: string
          target_twitter_media_asset_id: string
          target_twitter_title: string
        }
        Returns: string
      }
      save_site_settings: {
        Args: {
          target_business_name: string
          target_is_active: boolean
          target_organization_id: string
          target_short_brand_description: string
          target_temporarily_closed: boolean
        }
        Returns: string
      }
      set_builder_entity_deleted: {
        Args: {
          target_deleted: boolean
          target_entity: string
          target_id: string
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
      soft_delete_gallery_item: {
        Args: { target_item_id: string; target_organization_id: string }
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Relationships: []
      }
      buckets_analytics: {
        Row: {
          created_at: string
          deleted_at: string | null
          format: string
          id: string
          name: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      buckets_vectors: {
        Row: {
          created_at: string
          id: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          metadata: Json | null
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          metadata?: Json | null
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          metadata?: Json | null
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      vector_indexes: {
        Row: {
          bucket_id: string
          created_at: string
          data_type: string
          dimension: number
          distance_metric: string
          id: string
          metadata_configuration: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          data_type: string
          dimension: number
          distance_metric: string
          id?: string
          metadata_configuration?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          data_type?: string
          dimension?: number
          distance_metric?: string
          id?: string
          metadata_configuration?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vector_indexes_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets_vectors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      allow_any_operation: {
        Args: { expected_operations: string[] }
        Returns: boolean
      }
      allow_only_operation: {
        Args: { expected_operation: string }
        Returns: boolean
      }
      can_insert_object: {
        Args: { bucketid: string; metadata: Json; name: string; owner: string }
        Returns: undefined
      }
      extension: { Args: { name: string }; Returns: string }
      filename: { Args: { name: string }; Returns: string }
      foldername: { Args: { name: string }; Returns: string[] }
      get_common_prefix: {
        Args: { p_delimiter: string; p_key: string; p_prefix: string }
        Returns: string
      }
      get_size_by_bucket: {
        Args: never
        Returns: {
          bucket_id: string
          size: number
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
          prefix_param: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          _bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_token?: string
          prefix_param: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      operation: { Args: never; Returns: string }
      search: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_by_timestamp: {
        Args: {
          p_bucket_id: string
          p_level: number
          p_limit: number
          p_prefix: string
          p_sort_column: string
          p_sort_column_after: string
          p_sort_order: string
          p_start_after: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v2: {
        Args: {
          bucket_name: string
          levels?: number
          limits?: number
          prefix: string
          sort_column?: string
          sort_column_after?: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      buckettype: "STANDARD" | "ANALYTICS" | "VECTOR"
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
  public: {
    Enums: {},
  },
  storage: {
    Enums: {
      buckettype: ["STANDARD", "ANALYTICS", "VECTOR"],
    },
  },
} as const
