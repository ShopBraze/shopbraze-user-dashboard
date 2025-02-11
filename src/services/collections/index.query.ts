import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { CollectionDetailsByIdTransformer, CollectionsTransformer } from "./transformers/index.transformer";

export const collectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollections: builder.query<{ currentPage: number, totalPages: number, totalItems: number, collectionsData: Collection[] }, { page: number, limit: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `${endpoints.collections}?page=${page}&limit=${limit}`
      }),
      transformResponse: (response) => CollectionsTransformer(response),
      providesTags: ['collections']
    }),
    getCollectionDetailsById: builder.query<{ collectionDetails: Collection, products: Catalogue[] }, any>({
      query: (collection_id) => ({
        url: `${endpoints.collections}/${collection_id}`,
      }),
      transformResponse: (response) => CollectionDetailsByIdTransformer(response),
      providesTags: ['collection_by_id']
    }),
    postCollection: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.collections,
        body: body,
      }),
      invalidatesTags: ['collections', 'catalogues']
    }),
    deleteCollection: builder.mutation<any, any>({
      query: (collection_id) => ({
        method: "DELETE",
        url: `${endpoints.collections}/${collection_id}`,
      }),
      invalidatesTags: ['collections', 'catalogues']
    }),
    updateCollectionVisibility: builder.mutation<any, any>({
      query: ({ body, collection_id }) => ({
        method: "PUT",
        url: `${endpoints.collection_toggle_visibility}/${collection_id}`,
        body: body,
      }),
      invalidatesTags: ['collections']
    }),
    updateCollectionDetails: builder.mutation<any, any>({
      query: ({ body, collection_id }) => ({
        method: "PUT",
        url: `${endpoints.collections}/${collection_id}`,
        body: body,
      }),
      invalidatesTags: ['collections', 'catalogues', 'collection_by_id']
    }),
  })
})



export const { useGetAllCollectionsQuery, useGetCollectionDetailsByIdQuery, usePostCollectionMutation, useDeleteCollectionMutation, useUpdateCollectionVisibilityMutation, useUpdateCollectionDetailsMutation } = collectionApi