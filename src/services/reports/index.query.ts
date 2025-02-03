import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { BulkUploadReportsTransformer } from "./transformers/index.transformer";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCatalogueReports: builder.query<any, void>({
      query: () => ({
        url: endpoints.catalogue_reports
      }),
      transformResponse: (response) => BulkUploadReportsTransformer(response),
      providesTags: ['reports']
    }),
  })
})



export const { useGetCatalogueReportsQuery } = reportsApi