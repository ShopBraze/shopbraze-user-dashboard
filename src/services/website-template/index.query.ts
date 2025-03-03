import baseApi from "services/base-api";
import endpoints from "services/endpoints";


export const websiteTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createTemplate: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: `${endpoints.page_template}`,
        body: body,
      }),
    }),
  })
})



export const { useCreateTemplateMutation } = websiteTemplateApi