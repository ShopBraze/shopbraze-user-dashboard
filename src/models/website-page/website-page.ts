type WebsitePage = {

  short_id: string
  type: "home_page" | "product_page" | "order_status_page" | "featured_page"
  internal_display_name: string
  template_short_ids: string[],
  is_visible?: boolean
  is_active?: boolean
  social_links?: string[],
  is_paginated?: boolean
  seller: string,
}


type WebsitePageTemplate = {
  title: string;
  description?: string;
  short_id: string;
  type:
  | "banner"
  | "category_group"
  | "product_group"
  | "category_tabbed"
  | "testimonial";
  sub_type?:
  | "new_arrivals"
  | "best_sellers"
  | "all_products"
  | "curated"
  | "recently_viewed";
  is_visible?: boolean;
  layout?: "grid" | "carousel";

  custom_style?: {
    title_alignment?: string;
  };

  template_settings?: {
    sort_by?: string;
    autoplay?: boolean;
    mobileview_rowcount?: number;
    desktopview_rowcount?: number;
    filter_by?: string;
  };

  banner_data?: {
    link?: string;
    img_url?: string;
  }[];

  category_group_data?: {
    name?: string;
    img_url?: string;
    link?: string;
  }[];

  category_tabbed_data?: {
    name?: string;
    collection_short_id?: string;
  }[];

  product_group_data?: {
    collection_short_id?: string;
  };

  seller: string;
};
