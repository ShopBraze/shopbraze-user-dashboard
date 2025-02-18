import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { SellersListTransformer } from "./transformers/index.transformers";


export const sellersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellersList: builder.query<Seller[], void>({
      query: () => ({
        url: `${endpoints.sellers_list}`,
      }),
      transformResponse: (response) => SellersListTransformer(response)
    }),
  })
})



export const { useGetSellersListQuery } = sellersApi