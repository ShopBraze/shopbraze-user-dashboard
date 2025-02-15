import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    // prepareHeaders:async (headers)=>{
    //   headers.set('Authorization', "Bearer eygfhjklkjhgjkl;kjhgjkl;kjhgjk")
    //   return headers
    // }
  }),
  endpoints: () => ({}),
  tagTypes: ['catalogues', 'collections', 'reports', 'collection_by_id', 'website_presets', 'theme_settings']
})

export default baseApi