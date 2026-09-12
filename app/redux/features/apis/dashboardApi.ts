import baseApi from "../../baseApi";
import { tags } from "../../tags";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get dashboard stats
    getDashboardStats: builder.query({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: [tags.dashboard],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
} = dashboardApi;

export default dashboardApi;