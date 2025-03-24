import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { WebsiteNavigationMenuTransformer } from "./transformers/index.transformers";

export const websiteNavigationMenuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWebsiteNavigationMenu: builder.query<WebsiteNavigationMenuType[], void>({
      query: () => ({
        url: `${endpoints.navigation_menu}`,
      }),
      transformResponse: (res) => WebsiteNavigationMenuTransformer(res),
      providesTags: ['website-navigation-menu']
    }),
    postCreateNavigation: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.navigation_menu,
        body: body,
      }),
      invalidatesTags: ['website-navigation-menu']
    }),
    updateWebsiteNavigationMenu: builder.mutation<any, any>({
      query: (body) => ({
        method: "PUT",
        url: `${endpoints.navigation_menu}`,
        body: body,
      }),
      invalidatesTags: ['website-navigation-menu']
    }),
  })
})



export const { useGetWebsiteNavigationMenuQuery, usePostCreateNavigationMutation, useUpdateWebsiteNavigationMenuMutation } = websiteNavigationMenuApi