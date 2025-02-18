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
    getUserData: builder.query<any, void>({
      query: () => ({
        url: `${endpoints.get_user}`
      }),
    }),
  })
})



export const { usePostLoginUserMutation, useGetUserDataQuery } = authApi