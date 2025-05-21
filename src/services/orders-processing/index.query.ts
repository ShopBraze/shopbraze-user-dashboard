import baseApi from "services/base-api";
import endpoints from "services/endpoints";

export const ordersProcessingAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postConfirmOrder: builder.mutation<any, string>({
      query: (order_id: string) => ({
        url: endpoints.order_confirmation,
        method: "POST",
        body: {
          order_id
        }
      }),
      invalidatesTags: ['pending-orders']
    }),
    getCourierServiceability: builder.query<any, any>({
      query: ({ pickup_postcode, delivery_postcode, cod, weight, declared_value, recommended_val }) => ({
        url: endpoints.courier_serviceability,
        params: {
          pickup_postcode,
          delivery_postcode,
          cod,
          weight,
          declared_value,
          recommended_val,
        }
      }),
    }),
    postGenerateAwb: builder.mutation<any, { order_id: string, courier_id: number }>({
      query: ({ order_id, courier_id }) => ({
        url: endpoints.generate_awb,
        method: "POST",
        body: {
          order_id,
          courier_id
        }
      }),
      invalidatesTags: ['pending-orders', 'ready-to-ship-orders']
    }),
    getShipmentFuturePickupDates: builder.query<any, { awb_code: string }>({
      query: ({ awb_code }) => ({
        url: endpoints.future_pickup_dates,
        params: {
          awb_code
        }
      }),
    }),
    postGenerateLabel: builder.mutation<any, { shipment_ids: string[] }>({
      query: ({ shipment_ids }) => ({
        url: endpoints.generate_label,
        method: "POST",
        body: {
          shipment_ids,
        }
      }),
    }),
    postGenerateInvoice: builder.mutation<any, { order_ids: string[] }>({
      query: ({ order_ids }) => ({
        url: endpoints.generate_invoice,
        method: "POST",
        body: {
          order_ids,
        }
      }),
    }),
  })
})



export const {
  useGetCourierServiceabilityQuery,
  usePostConfirmOrderMutation,
  usePostGenerateAwbMutation,
  useGetShipmentFuturePickupDatesQuery,
  usePostGenerateLabelMutation,
  usePostGenerateInvoiceMutation
} = ordersProcessingAPi