import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { ThemeConstantTransformer, ThemeSettingsTransformer, WebsiteConfigTransformer, WebsitePresetTransformer } from "./transformer/index.transformer";


export const websiteConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWebsiteConfig: builder.query<WebsiteConfig, void>({
      query: () => ({
        url: `${endpoints.website_config}`
      }),
      transformResponse: (response) => WebsiteConfigTransformer(response),
      providesTags: ['website-config']
    }),

    updateWebsiteConfig: builder.mutation<any, any>({
      query: (body) => ({
        method: "PUT",
        url: `${endpoints.website_config}`,
        body: body,
      }),
      invalidatesTags: ['website-config']
    }),

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
      providesTags: ['theme_settings']
    }),

    updateThemeSettings: builder.mutation<any, any>({
      query: (body) => ({
        method: "PUT",
        url: `${endpoints.theme_settings}`,
        body: body,
      }),
      invalidatesTags: ['theme_settings']
    }),

    resetThemeSettings: builder.mutation<any, any>({
      query: () => ({
        method: "POST",
        url: `${endpoints.reset_theme_settings}`,
      }),
      invalidatesTags: ['theme_settings']
    }),

    getWebsitePresets: builder.query<WebsitePreset, void>({
      query: () => ({
        url: `${endpoints.website_preset}`
      }),
      transformResponse: (response) => WebsitePresetTransformer(response),
      providesTags: ['website_presets']
    }),

    updateWebsitePresets: builder.mutation<any, any>({
      query: (body) => ({
        method: "PUT",
        url: `${endpoints.website_preset}`,
        body: body,
      }),
      invalidatesTags: ['website_presets']
    }),
  })
})



export const { useGetWebsiteConfigQuery, useUpdateWebsiteConfigMutation, useGetThemeConstantsQuery, useGetThemeSettingsQuery, useUpdateThemeSettingsMutation, useResetThemeSettingsMutation, useGetWebsitePresetsQuery, useUpdateWebsitePresetsMutation } = websiteConfigApi