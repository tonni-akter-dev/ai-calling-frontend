// import baseApi from "../../baseApi";

// const api = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     register: builder.mutation({
//       query: ({ data }) => ({
//         url: "/auth/signup",
//         method: "POST",
//         data,
//       }),
//     }),


//     login: builder.mutation({
//       query: ({ data }) => ({
//         url: "/auth/login",
//         method: "POST",
//         data,
//       }),
//     }),

//     logout: builder.mutation({
//       query: ({ data }) => ({
//         url: "/auth/logout",
//         method: "POST",
//         data,
//       }),
//     }),

  
//   }),
// });

// export const {
//   useRegisterMutation,
//   useLoginMutation,
//   useLogoutMutation,
// } = api;

import baseApi from "../../baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/signup",
        method: "POST",
        data,
      }),
    }),

    login: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
    }),

    logout: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/logout",
        method: "POST",
        data,
      }),
    }),

    // 🆕 Forgot Password - Request reset link
    forgotPassword: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data,
      }),
    }),

    // 🆕 Validate Reset Token - Check if link is still valid
    validateResetToken: builder.query({
      query: ({ token }) => ({
        url: "/auth/reset-password/validate",
        method: "GET",
        params: { token },
      }),
    }),

    // 🆕 Reset Password - Submit new password
    resetPassword: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/reset-password",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useValidateResetTokenQuery,
  useResetPasswordMutation,
} = api;