import baseApi from "services/base-api";

export const collectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollections: builder.query<any, any>({
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