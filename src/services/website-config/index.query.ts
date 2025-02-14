import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { ThemeConstantTransformer, ThemeSettingsTransformer, WebsitePresetTransformer } from "./transformer/index.transformer";


export const websiteConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getThemeConstants: builder.query<ThemeConstants, void>({
      query: () => ({
        url: `${endpoints.theme_constants}`
      }),
      transformResponse: (response) => ThemeConstantTransformer(response),
    }),
    getThemeSettings: builder.query<ThemeSettings, void>({
      query: () => ({
        url: `${endpoints.theme_settings}`
      }),
      transformResponse: (response) => ThemeSettingsTransformer(response),
    }),
    getWebsitePresets: builder.query<WebsitePreset, void>({
      query: () => ({
        url: `${endpoints.website_preset}`
      }),
      transformResponse: (response) => WebsitePresetTransformer(response),
    }),
  })
})



export const { useGetThemeConstantsQuery, useGetThemeSettingsQuery, useGetWebsitePresetsQuery } = websiteConfigApi