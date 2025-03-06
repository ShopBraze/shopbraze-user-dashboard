import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { TemplatesInPageTransformer, WebsitePageTransformer } from "./transformers/index.transformers";


export const websitePageAndTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getWebsitePageInfo: builder.query<WebsitePage, string>({
      query: (page_name: string) => ({
        url: `${endpoints.website_page}/${page_name}`
      }),
      transformResponse: (response) => WebsitePageTransformer(response),
    }),

    getTemplatesInPage: builder.query<WebsitePageTemplate[], { page_type: string, page_id: string }>({
      query: ({ page_type, page_id }) => ({
        url: `${endpoints.templates_in_page}/${page_id}?page_type=${page_type}`
      }),
      transformResponse: (response) => TemplatesInPageTransformer(response),
      providesTags: ['templates-in-page']
    }),

    createTemplate: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: `${endpoints.template}`,
        body: body,
      }),
      invalidatesTags: ['templates-in-page']
    }),

    postReorderTemplatesInPage: builder.mutation<any, { page_id: string, template_ids: string[] }>({
      query: (body) => ({
        method: "POST",
        url: `${endpoints.reorder_templates}`,
        body: body,
      }),
      invalidatesTags: ['templates-in-page']
    }),
  })
})



export const { useGetWebsitePageInfoQuery, useCreateTemplateMutation, useGetTemplatesInPageQuery, usePostReorderTemplatesInPageMutation } = websitePageAndTemplateApi