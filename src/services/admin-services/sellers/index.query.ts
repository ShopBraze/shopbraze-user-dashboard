import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { SellersListTransformer } from "./transformers/index.transformers";


export const sellersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellersList: builder.query<Seller[], void>({
      query: () => ({
        url: `${endpoints.sellers_list}`,
      }),
      transformResponse: (response) => SellersListTransformer(response),
      providesTags: ['sellers-list']
    }),
    postSellers: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.sellers,
        body: body,
      }),
      invalidatesTags: ['sellers-list']
    }),
  })
})



export const { useGetSellersListQuery, usePostSellersMutation } = sellersApi