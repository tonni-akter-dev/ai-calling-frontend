import baseApi from "../../baseApi";
import { tags } from "../../tags";

const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Launch campaign
    launchCampaign: builder.mutation({
      query: (data) => ({
        url: "/campaigns/launch",
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tags.campaigns],
    }),

    // Get live logs
    getLiveLogs: builder.query({
      query: () => ({
        url: "/campaigns/live-logs",
        method: "GET",
      }),
      providesTags: [tags.campaigns],
    }),

    // Get all campaigns
    getAllCampaigns: builder.query({
      query: () => ({
        url: "/campaigns",
        method: "GET",
      }),
      providesTags: [tags.campaigns],
    }),

    // Get campaign stats
    getCampaignStats: builder.query({
      query: () => ({
        url: "/campaigns/stats",
        method: "GET",
      }),
      providesTags: [tags.campaigns],
    }),

    // Get campaign by ID
    getCampaignById: builder.query({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "GET",
      }),
      providesTags: [tags.campaigns],
    }),

    // Update campaign status
    updateCampaignStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/campaigns/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [tags.campaigns],
    }),

    // Delete campaign
    deleteCampaign: builder.mutation({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.campaigns],
    }),
  }),
});

export const {
  useLaunchCampaignMutation,
  useGetLiveLogsQuery,
  useGetAllCampaignsQuery,
  useGetCampaignStatsQuery,
  useGetCampaignByIdQuery,
  useUpdateCampaignStatusMutation,
  useDeleteCampaignMutation,
} = campaignApi;

export default campaignApi;