export const WebsiteConfigTransformer = (res?: any) => {
  let website_config_data = {} as WebsiteConfig;

  if (res?.data) {
    const item = res.data;

    website_config_data.name = item.name;
    website_config_data.description = item.description;
    website_config_data.logo = item.logo;
    website_config_data.favicon = item.favicon;
    website_config_data.facebook_url = item.facebook_url;
    website_config_data.instagram_url = item.instagram_url;
    website_config_data.whatsapp_number = item.whatsapp_number;
    website_config_data.customer_support_number = item.customer_support_number;
    website_config_data.add_to_bag = item.add_to_bag;
    website_config_data.capture_website_metrics = item.capture_website_metrics;
    website_config_data.category_tags = item.category_tags || [];

    website_config_data.ui_settings = {
      auto_scroll_banner: item.ui_settings?.auto_scroll_banner,
      auto_scroll_product_card: item.ui_settings?.auto_scroll_product_card,
      product_card_layout: item.ui_settings?.product_card_layout,
      product_card_add_to_bag: item.ui_settings?.product_card_add_to_bag,
      show_order_cancel: item.ui_settings?.show_order_cancel,
      size_confirmation: item.ui_settings?.size_confirmation,
      image_fit: item.ui_settings?.image_fit,
      header_logo_size: item.ui_settings?.header_logo_size,
    };

    website_config_data.policies = {
      policies_text_obj: {
        privacy_policy_text: item.policies?.policies_text_obj?.privacy_policy_text || "",
        return_policy_text: item.policies?.policies_text_obj?.return_policy_text || "",
        terms_and_conditions_text: item.policies?.policies_text_obj?.terms_and_conditions_text || "",
        shipping_policy_text: item.policies?.policies_text_obj?.shipping_policy_text || "",
        about_us_text: item.policies?.policies_text_obj?.about_us_text || "",
      },
      use_default_privacy_policy: item.policies?.use_default_privacy_policy,
      use_default_return_policy: item.policies?.use_default_return_policy,
      use_default_terms_and_conditions: item.policies?.use_default_terms_and_conditions,
      use_default_shipping_policy: item.policies?.use_default_shipping_policy,
      use_default_about_us: item.policies?.use_default_about_us,
    };
  }

  return website_config_data;
};



export const ThemeConstantTransformer = (res: any) => {
  const theme_constants = {} as ThemeConstants

  if (res?.data) {
    theme_constants.available_themes = res?.data?.available_themes,
      theme_constants.font_data = res?.data?.font_data
  }
  return theme_constants
}


export const ThemeSettingsTransformer = (res: any) => {
  const theme_settings = {} as ThemeSettings
  if (res?.data) {
    theme_settings.font_family = res?.data?.font_family,
      theme_settings.primary_color = res?.data?.primary_color
  }

  return theme_settings
}

export const WebsitePresetTransformer = (res: any) => {
  const website_preset = {} as WebsitePreset
  if (res?.data) {
    website_preset.sale_event = res?.data?.sale_event
    website_preset.selected_website_theme = res?.data?.selected_website_theme
  }
  return website_preset
}