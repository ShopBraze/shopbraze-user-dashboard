import baseApi from "services/base-api";

export const catalogueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCatalogues: builder.query<any, any>({
      query: () => ({
        url: endpoints.catalogues
      }),
      // transformErrorResponse:(response)=>transformCatalogues(response),
      providesTags: ['catalogues']
    }),
    postCatalogue: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.catalogues,
        body: body,
        // params:""
      }),
      invalidatesTags: ['catalogues']
    })
  })
})



export const { useGetAllCataloguesQuery, usePostCatalogueMutation } = catalogueApi