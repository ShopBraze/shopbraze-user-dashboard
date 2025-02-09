import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { CollectionsTransformer } from "./transformers/index.transformer";

export const collectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollections: builder.query<{ currentPage: number, totalPages: number, totalItems: number, collectionsData: Collection[] }, { page: number, limit: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `${endpoints.collections}?page=${page}&limit=${limit}`
      }),
      transformResponse: (response) => CollectionsTransformer(response),
      providesTags: ['collections']
    }),
    postCollection: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.collections,
        body: body,
      }),
      invalidatesTags: ['collections', 'catalogues']
    })
  })
})



export const { useGetAllCollectionsQuery, usePostCollectionMutation } = collectionApi