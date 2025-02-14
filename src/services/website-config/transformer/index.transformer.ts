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