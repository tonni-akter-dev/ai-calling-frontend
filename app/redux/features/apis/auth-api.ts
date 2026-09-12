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

  
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = api;
