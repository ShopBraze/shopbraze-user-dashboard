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
  })
})



export const { useGetCourierServiceabilityQuery, usePostConfirmOrderMutation } = ordersProcessingAPi