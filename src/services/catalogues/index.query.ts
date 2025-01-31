import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { CatalogueTransformer } from "./transformers/index.transformer";

export const catalogueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCatalogues: builder.query<Catalogue[], void>({
      query: () => ({
        url: endpoints.catalogues
      }),
      transformResponse: (response) => CatalogueTransformer(response),
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