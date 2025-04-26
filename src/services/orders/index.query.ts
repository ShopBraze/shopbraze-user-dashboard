import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { OrdersTransformer } from "./transformers/index.transformers";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPendingOrders: builder.query<CustomerOrderType[], void>({
      query: () => ({
        url: endpoints.pending_orders
      }),
      transformResponse: (response) => OrdersTransformer(response),
    }),
  })
})



export const { useGetPendingOrdersQuery } = reportsApi