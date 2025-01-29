import baseApi from "services/base-api";
import endpoints from "services/endpoints";

export const collectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollections: builder.query<any, void>({
      query: () => ({
        url: endpoints.collections
      }),
      // transformErrorResponse:(response)=>transformCatalogues(response),
    }),
    postCollection: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.collections,
        body: body,
      }),
    })
  })
})



export const { useGetAllCollectionsQuery, usePostCollectionMutation } = collectionApi