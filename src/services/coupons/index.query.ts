import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { CouponsDataTransformers } from "./transformers/index.transformers";

export const couponsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query<CouponType[], void>({
      query: () => ({
        url: `${endpoints.coupons}`,
      }),
      transformResponse: (response) => CouponsDataTransformers(response),
      providesTags: ['coupons']
    }),
    postCreateCoupon: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.coupons,
        body: body,
      }),
      invalidatesTags: ['coupons']
    }),
    updateCouponDetails: builder.mutation<any, any>({
      query: ({ body, coupon_short_id }) => ({
        method: "PUT",
        url: `${endpoints.coupons}/${coupon_short_id}`,
        body: body,
      }),
      invalidatesTags: ['coupons']
    }),
  })
})



export const { useGetAllCouponsQuery, usePostCreateCouponMutation, useUpdateCouponDetailsMutation } = couponsApi