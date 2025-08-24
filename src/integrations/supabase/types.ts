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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_first_admin: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_first_admin?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_first_admin?: boolean
          user_id?: string
        }
        Relationships: []
      }
      ai_tokens: {
        Row: {
          created_at: string
          created_for: string
          expires_at: string
          id: string
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_for: string
          expires_at: string
          id?: string
          token: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_for?: string
          expires_at?: string
          id?: string
          token?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_summary: {
        Row: {
          id: string
          metric_name: string
          metric_value: number
          updated_at: string
        }
        Insert: {
          id?: string
          metric_name: string
          metric_value?: number
          updated_at?: string
        }
        Update: {
          id?: string
          metric_name?: string
          metric_value?: number
          updated_at?: string
        }
        Relationships: []
      }
      auto_optimizer_logs: {
        Row: {
          actions: string[] | null
          after: Json | null
          before: Json | null
          content_id: string | null
          content_type: string | null
          created_at: string
          errors: string[] | null
          id: string
          impact_score: number | null
          path: string | null
          run_id: string
        }
        Insert: {
          actions?: string[] | null
          after?: Json | null
          before?: Json | null
          content_id?: string | null
          content_type?: string | null
          created_at?: string
          errors?: string[] | null
          id?: string
          impact_score?: number | null
          path?: string | null
          run_id?: string
        }
        Update: {
          actions?: string[] | null
          after?: Json | null
          before?: Json | null
          content_id?: string | null
          content_type?: string | null
          created_at?: string
          errors?: string[] | null
          id?: string
          impact_score?: number | null
          path?: string | null
          run_id?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          author_email: string
          author_name: string
          content: string
          created_at: string
          id: string
          post_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          author_email: string
          author_name: string
          content: string
          created_at?: string
          id?: string
          post_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          author_email?: string
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_tags: {
        Row: {
          id: string
          post_id: string | null
          tag_id: string | null
        }
        Insert: {
          id?: string
          post_id?: string | null
          tag_id?: string | null
        }
        Update: {
          id?: string
          post_id?: string | null
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_email: string | null
          author_name: string
          category_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          featured_image_url: string | null
          id: string
          likes_count: number | null
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          published_at: string | null
          reading_time: number | null
          scheduled_publish_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          author_email?: string | null
          author_name?: string
          category_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          featured_image_url?: string | null
          id?: string
          likes_count?: number | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          scheduled_publish_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          author_email?: string | null
          author_name?: string
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          featured_image_url?: string | null
          id?: string
          likes_count?: number | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          scheduled_publish_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts_backup: {
        Row: {
          backed_up_at: string | null
          content_backup: string | null
          id: string | null
        }
        Insert: {
          backed_up_at?: string | null
          content_backup?: string | null
          id?: string | null
        }
        Update: {
          backed_up_at?: string | null
          content_backup?: string | null
          id?: string | null
        }
        Relationships: []
      }
      blog_tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      comment_submissions: {
        Row: {
          comment_id: string | null
          id: string
          ip_address: string
          status: string | null
          submitted_at: string | null
        }
        Insert: {
          comment_id?: string | null
          id?: string
          ip_address: string
          status?: string | null
          submitted_at?: string | null
        }
        Update: {
          comment_id?: string | null
          id?: string
          ip_address?: string
          status?: string | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_submissions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "blog_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_tracking: {
        Row: {
          booking_completed: boolean | null
          conversion_value: number | null
          created_at: string
          form_submissions: number | null
          id: string
          ip_address: string | null
          landing_page: string | null
          pages_visited: number | null
          referrer: string | null
          session_id: string | null
          time_on_site: number | null
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          booking_completed?: boolean | null
          conversion_value?: number | null
          created_at?: string
          form_submissions?: number | null
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          pages_visited?: number | null
          referrer?: string | null
          session_id?: string | null
          time_on_site?: number | null
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          booking_completed?: boolean | null
          conversion_value?: number | null
          created_at?: string
          form_submissions?: number | null
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          pages_visited?: number | null
          referrer?: string | null
          session_id?: string | null
          time_on_site?: number | null
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      planner_usage: {
        Row: {
          action_type: string
          calories: number | null
          created_at: string
          id: string
          ip_address: string | null
          plan_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          calories?: number | null
          created_at?: string
          id?: string
          ip_address?: string | null
          plan_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          calories?: number | null
          created_at?: string
          id?: string
          ip_address?: string | null
          plan_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          activity_level: string | null
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          first_name: string | null
          fitness_goal: string | null
          gender: string | null
          height: number | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          activity_level?: string | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          fitness_goal?: string | null
          gender?: string | null
          height?: number | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          activity_level?: string | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          fitness_goal?: string | null
          gender?: string | null
          height?: number | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          created_at: string | null
          id: string
          identifier: string
          requests_count: number | null
          resource: string
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          identifier: string
          requests_count?: number | null
          resource: string
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          identifier?: string
          requests_count?: number | null
          resource?: string
          window_start?: string | null
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      site_visits: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          page_path: string
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          page_path: string
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          page_path?: string
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      url_redirects: {
        Row: {
          created_at: string
          from_path: string
          id: string
          source_type: string | null
          status_code: number
          to_path: string
        }
        Insert: {
          created_at?: string
          from_path: string
          id?: string
          source_type?: string | null
          status_code?: number
          to_path: string
        }
        Update: {
          created_at?: string
          from_path?: string
          id?: string
          source_type?: string | null
          status_code?: number
          to_path?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_user_role: {
        Args: {
          _assigned_by?: string
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      audit_security_event: {
        Args: {
          event_data_param?: Json
          event_type_param: string
          user_id_param?: string
        }
        Returns: undefined
      }
      clean_blog_content: {
        Args: { input_content: string }
        Returns: string
      }
      current_user_has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      fix_and_format_articles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      format_article_content: {
        Args: { input_content: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_article_views: {
        Args: { article_id: string }
        Returns: undefined
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      log_unauthorized_access_attempt: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      log_unauthorized_lead_access: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      repair_html_content: {
        Args: { input_content: string }
        Returns: string
      }
      restore_and_fix_all_posts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      revoke_user_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      submit_blog_comment: {
        Args: {
          p_author_email: string
          p_author_name: string
          p_content: string
          p_post_id: string
        }
        Returns: Json
      }
      update_analytics_summary: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      validate_request_hmac: {
        Args: {
          expected_key_name?: string
          payload_text: string
          signature_header: string
        }
        Returns: boolean
      }
      verify_ai_token_access: {
        Args: { token_input: string }
        Returns: {
          can_use_ai: boolean
          is_admin: boolean
          roles: string[]
          user_id: string
          valid: boolean
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "editor"
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
    Enums: {
      app_role: ["admin", "moderator", "user", "editor"],
    },
  },
} as const
