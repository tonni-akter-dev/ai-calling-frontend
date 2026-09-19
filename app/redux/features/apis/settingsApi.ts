import baseApi from "../../baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIpcallSettings: builder.query({
      query: () => ({
        url: "/admin/settings/ipcall",
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),

    updateIpcallSettings: builder.mutation({
      query: ({ data }) => ({
        url: "/admin/settings/ipcall",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetIpcallSettingsQuery, useUpdateIpcallSettingsMutation } =
  api;
