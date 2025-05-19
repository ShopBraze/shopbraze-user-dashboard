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
    deleteTemplate: builder.mutation<any, string>({
      query: (template_id) => ({
        method: "DELETE",
        url: `${endpoints.template}/${template_id}`,
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

    putToggleTemplateVisibility: builder.mutation<any, { template_id: string, body: { visibility: boolean } }>({
      query: ({ template_id, body }) => ({
        method: "PUT",
        url: `${endpoints.toggle_template_visibility}/${template_id}`,
        body: body,
      }),
      invalidatesTags: ['templates-in-page']
    }),

    updateTemplateData: builder.mutation<any, { template_id: string, body: any }>({
      query: ({ template_id, body }) => ({
        method: "PUT",
        url: `${endpoints.template}/${template_id}`,
        body: body,
      }),
      invalidatesTags: ['templates-in-page']
    }),

    postCopyTemplate: builder.mutation<any, { template_id: string, page_id: string }>({
      query: ({ template_id, page_id }) => ({
        method: "POST",
        url: `${endpoints.copy_template}/${template_id}/${page_id}`,
      }),
      invalidatesTags: ['templates-in-page']
    }),
  })
})



export const {
  useGetWebsitePageInfoQuery,
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplatesInPageQuery,
  usePostReorderTemplatesInPageMutation,
  usePutToggleTemplateVisibilityMutation,
  usePostCopyTemplateMutation,
  useUpdateTemplateDataMutation
} = websitePageAndTemplateApi