import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { OrdersTransformer } from "./transformers/index.transformers";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPendingOrders: builder.query<CustomerOrderType[], void>({
      query: () => ({
        url: endpoints.pending_orders
      }),
      providesTags: ['pending-orders'],
      transformResponse: (response) => OrdersTransformer(response),
    }),
    getReadyToShipOrders: builder.query<CustomerOrderType[], void>({
      query: () => ({
        url: endpoints.ready_to_ship_orders
      }),
      providesTags: ['ready-to-ship-orders'],
      transformResponse: (response) => OrdersTransformer(response),
    }),
  })
})



export const { useGetPendingOrdersQuery, useGetReadyToShipOrdersQuery } = reportsApi