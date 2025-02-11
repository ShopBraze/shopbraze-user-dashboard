import baseApi from "services/base-api";
import endpoints from "services/endpoints";

export const bulkUploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postBulkUploadCatalogues: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.bulk_upload_catalogues,
        body: body,
      }),
      invalidatesTags: ['catalogues', 'reports']
    }),
    postBulkUploadCollections: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.bulk_upload_collections,
        body: body,
      }),
      invalidatesTags: ['collections', 'catalogues']
    })
  })
})



export const { usePostBulkUploadCataloguesMutation, usePostBulkUploadCollectionsMutation } = bulkUploadApi