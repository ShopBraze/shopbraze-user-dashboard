import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { SizeChartsTransformer } from "./transformer/index.transformer";


export const sizeChartsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSizeCharts: builder.query<SizeChartType[], void>({
      query: () => ({
        url: endpoints.size_charts,
      }),
      transformResponse: (res) => SizeChartsTransformer(res),
      providesTags: ['size-charts']
    }),
    postCreateSizeChart: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.size_charts,
        body
      }),
      invalidatesTags: ['size-charts']
    }),
    updateSizeChart: builder.mutation<any, any>({
      query: ({ body, size_chart_id }) => ({
        method: "PUT",
        url: `${endpoints.size_charts}/${size_chart_id}`,
        body
      }),
      invalidatesTags: ['size-charts']
    }),
    deleteSizeChart: builder.mutation<any, any>({
      query: ({ size_chart_id }) => ({
        method: "DELETE",
        url: `${endpoints.size_charts}/${size_chart_id}`,
      }),
      invalidatesTags: ['size-charts']
    }),
  })
})



export const { useGetSizeChartsQuery, usePostCreateSizeChartMutation, useUpdateSizeChartMutation, useDeleteSizeChartMutation } = sizeChartsApi