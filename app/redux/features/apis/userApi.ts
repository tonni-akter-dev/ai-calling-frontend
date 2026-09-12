import baseApi from "../../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Super Admin creates a new user
    createUser: builder.mutation({
      query: (data) => ({
        url: "/auth/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    // Get current user
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useCreateUserMutation, useGetMeQuery, useGetAllUsersQuery } =
  userApi;

export default userApi;
