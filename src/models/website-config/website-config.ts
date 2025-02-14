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