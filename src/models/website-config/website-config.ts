type ThemeConstants = {
  available_themes: {
    label: string,
    is_enabled: boolean,
    value: string
  }[],
  font_data: {
    family_name: string;
    available_font_weights: number[];
  }[]
}

type ThemeSettings = {
  primary_color: {
    red: number,
    green: number,
    blue: number
  },
  font_family: {
    body: {
      name: string,
      weight: string
    },
    heading: {
      name: string,
      weight: string
    },
    title1: {
      name: string,
      weight: string
    },
    title2: {
      name: string,
      weight: string
    },
    title3: {
      name: string,
      weight: string
    },
  }
}

type WebsitePreset = {
  sale_event: boolean
  selected_website_theme: string
}

type WebsiteConfig = {
  name: string,
  description: string,
  logo: string
  favicon: string,
  facebook_url: string,
  instagram_url: string,
  whatsapp_number: string,
  customer_support_number: string,
  add_to_bag: boolean
  capture_website_metrics: boolean
  ui_settings: {
    auto_scroll_banner: boolean
    auto_scroll_product_card: boolean
    product_card_layout: string
    product_card_add_to_bag: boolean
    show_order_cancel: boolean
    size_confirmation: boolean
    image_fit: string
    header_logo_size: string
  }
  category_tags: string[],
  policies: {
    use_default_privacy_policy: boolean
    use_default_return_policy: boolean
    use_default_terms_and_conditions: boolean
    use_default_shipping_policy: boolean
    use_default_about_us: boolean
    policies_text_obj: {
      privacy_policy_text: string
      return_policy_text: string
      terms_and_conditions_text: string
      shipping_policy_text: string
      about_us_text: string
    }
  }
}