import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { CatalogueTransformer } from "./transformers/index.transformer";

export const catalogueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCatalogues: builder.query<{ currentPage: number, totalPages: number, totalItems: number, cataloguesData: Catalogue[] }, { page: number, limit: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `${endpoints.catalogues}?page=${page}&limit=${limit}`
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
    }),
    deleteCatalogue: builder.mutation<any, any>({
      query: (catalogueId) => ({
        method: "DELETE",
        url: `${endpoints.catalogues}/${catalogueId}`,
      }),
      invalidatesTags: ['catalogues']
    }),
    updateCatalogueSkuData: builder.mutation<any, any>({
      query: ({ body, catalogueShortId }) => ({
        method: "PUT",
        url: `${endpoints.catalogues}/update-sku/${catalogueShortId}`,
        body: body,
      }),
      invalidatesTags: ['catalogues']
    })
  })
})



export const { useGetAllCataloguesQuery, usePostCatalogueMutation, useDeleteCatalogueMutation, useUpdateCatalogueMutation, useUpdateCatalogueSkuDataMutation } = catalogueApi