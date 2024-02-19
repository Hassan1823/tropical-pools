import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userNewPassword, userRegistration } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userNewPassword({
              token: result.data.activationToken,
              // user: result.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),

    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "reset-password",
        method: "POST",
        body: { email },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled();
          dispatch(
            userRegistration({
              token: result.data.activationToken,
              // user: result.user,
            })
          );
          console.log("result is :");
          console.log(result.data.activationToken);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    setUserPassword: builder.mutation({
      query: ({ activation_token, activation_code, newPassword }) => ({
        url: "confirm-password",
        method: "POST",
        body: {
          activation_token,
          activation_code,
          newPassword,
        },
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login-user",
        method: "POST",
        body: {
          email,
          password,
        },
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

    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
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

    logout: builder.query({
      query: () => ({
        url: "logout-user",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useSetUserPasswordMutation,
  useLogoutQuery,
  useSocialAuthMutation,
} = authApi;
