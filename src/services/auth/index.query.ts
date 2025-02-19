import baseApi from "services/base-api";
import endpoints from "services/endpoints";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postLoginUser: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.login,
        body: body,
      }),
    }),
    getUserData: builder.query<any, { viewAsSellerId?: string }>({
      query: ({ viewAsSellerId }) => ({
        url: `${endpoints.get_user}`,
        headers: viewAsSellerId ? { "X-View-As": viewAsSellerId } : {}
      }),
    }),
  })
})



export const { usePostLoginUserMutation, useGetUserDataQuery, useLazyGetUserDataQuery } = authApi