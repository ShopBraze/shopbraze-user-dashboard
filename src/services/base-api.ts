import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "state/store";

const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const isAdminAsSeller = state?.auth?.user?.type === "system" && state?.auth?.currentView === "seller" && state?.userProfile?.userProfile?.type === "seller"
      if (isAdminAsSeller) {
        headers.set("X-view-as", state?.userProfile?.userProfile?._id);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    'catalogues',
    'size-charts',
    'collections',
    'reports',
    'collection_by_id',
    'website_presets',
    'theme_settings',
    'sellers-list',
    'templates-in-page',
    'coupons',
    'website-navigation-menu',
    'testimonials'
  ]
})

export default baseApi