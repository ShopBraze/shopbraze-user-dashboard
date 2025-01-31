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
      }),
      invalidatesTags: ['catalogues']
    }),
    updateCatalogue: builder.mutation<any, any>({
      query: ({ body, catalogueId }) => ({
        method: "PUT",
        url: `${endpoints.catalogues}/${catalogueId}`,
        body: body,
        // params: { catalogueId }
      }),
      invalidatesTags: ['catalogues']
    })
  })
})



export const { useGetAllCataloguesQuery, usePostCatalogueMutation, useUpdateCatalogueMutation } = catalogueApi