import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DERVER_URI,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "refresh-token",
        method: "GET",
        credentials: "include",
      }),
    }),

    loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    allUsers: builder.query({
      query: (data) => ({
        url: "all-users",
        method: "GET",
        credentials: "include",
      }),
    }),

    updateUserRole: builder.mutation({
      query: (data) => ({
        url: "user-role",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRefreshTokenQuery,
  useLoadUserQuery,
  useAllUsersQuery,
  useUpdateUserRoleMutation,
} = apiSlice;
