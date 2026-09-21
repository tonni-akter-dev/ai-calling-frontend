import baseApi from "../../baseApi";
import { tags } from "../../tags";

/* ============================================================
   Types
   ============================================================ */
export interface ApiCampaign {
  id: number;
  name: string;
  total_numbers: number;
  status: string;
  created_at: string;
  updated_at?: string;
  created_by: string | null;
  created_by_email: string | null;
  company_id: number | null;
  company_name: string | null;
  audio_file_name: string | null;
  audio_url?: string | null;
  completed: number;
  active: number;
  failed: number;
  queued: number;
  total_processed: number;
  remaining: number;
}

export interface CampaignListResponse {
  success: boolean;
  data: ApiCampaign[];
}

export interface CampaignDetailResponse {
  success: boolean;
  data: ApiCampaign & {
    numbers: Array<{
      id: number;
      phone_number: string;
      status: string;
      duration: number;
      updated_at: string;
    }>;
  };
}

export interface CampaignStatsResponse {
  success: boolean;
  data: {
    totalCampaigns: number;
    activeCampaigns: number;
    completedCampaigns: number;
    pausedCampaigns: number;
    cancelledCampaigns: number;
    totalNumbersCalled: number;
    creditsUsed: number;
  };
}

export interface LiveLogsResponse {
  success: boolean;
  summary: {
    total: number;
    success: number;
    active: number;
    failed: number;
  };
  logs: Array<{
    id: number;
    phone: string;
    status: string;
    duration: number;
    time: string;
  }>;
}

export interface CallHistoryResponse {
  success: boolean;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Array<{
    id: number;
    campaign_id: number;
    campaign_name: string;
    phone: string;
    status: string;
    duration: number;
    external_call_id: string | null;
    recording_url: string | null;
    dtmf: string | null;
    created_at: string;
    updated_at: string;
  }>;
}

export interface CallHistoryFilters {
  page?: number;
  per_page?: number;
  status?: string;
  mobile?: string;
  campaign_id?: number | string;
  date_from?: string;
  date_to?: string;
}

export interface AllCallLogsFilters {
  mobile?: string;
  status?: string;
  agent?: string;
  call_type?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  per_page?: number;
}

/* ============================================================
   API
   ============================================================ */
const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* --------------------------------------------------------
       Launch campaign (multipart for file, JSON for URL)
    -------------------------------------------------------- */
    launchCampaign: builder.mutation<any, FormData | Record<string, any>>({
      query: (body) => ({
        url: "/campaigns/launch",
        method: "POST",
        body, // ✅ was `data`
        // ⚠️ Do NOT manually set multipart headers — RTK Query does it
        // automatically when body is FormData. Setting it manually breaks
        // the multipart boundary.
      }),
      invalidatesTags: [tags.campaigns],
    }),

    /* --------------------------------------------------------
       Live logs (polled every 30s)
    -------------------------------------------------------- */
    getLiveLogs: builder.query<LiveLogsResponse, void>({
      query: () => ({
        url: "/campaigns/live-logs",
        method: "GET",
      }),
      providesTags: [tags.campaigns],
    }),

    /* --------------------------------------------------------
       All campaigns list
    -------------------------------------------------------- */
    getAllCampaigns: builder.query<CampaignListResponse, void>({
      query: () => ({
        url: "/campaigns",
        method: "GET",
      }),
      providesTags: [tags.campaigns],
    }),

    /* --------------------------------------------------------
       Campaign stats
    -------------------------------------------------------- */
    getCampaignStats: builder.query<CampaignStatsResponse, void>({
      query: () => ({
        url: "/campaigns/stats",
        method: "GET",
      }),
      providesTags: [tags.campaigns],
    }),

    /* --------------------------------------------------------
       Campaign by ID
    -------------------------------------------------------- */
    getCampaignById: builder.query<CampaignDetailResponse, number | string>({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "GET",
      }),
      providesTags: [tags.campaigns],
    }),

    /* --------------------------------------------------------
       Update campaign status
    -------------------------------------------------------- */
    updateCampaignStatus: builder.mutation<
      any,
      { id: number | string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/campaigns/${id}/status`,
        method: "PATCH",
        body: { status }, // ✅ was `data`
      }),
      invalidatesTags: [tags.campaigns],
    }),

    /* --------------------------------------------------------
       Delete campaign
    -------------------------------------------------------- */
    deleteCampaign: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.campaigns],
    }),

    /* --------------------------------------------------------
       Call history (paginated, company-scoped)
    -------------------------------------------------------- */
    getCallHistory: builder.query<CallHistoryResponse, CallHistoryFilters>({
      query: (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value));
          }
        });
        const qs = params.toString();
        return {
          url: `/campaigns/history${qs ? `?${qs}` : ""}`,
          method: "GET",
        };
      },
      providesTags: [tags.campaigns],
    }),

    /* --------------------------------------------------------
       Raw IPCall call logs (direct from IPCall BD)
    -------------------------------------------------------- */
    getAllCallLogs: builder.query<any, AllCallLogsFilters | void>({
      query: (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters || {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value));
          }
        });
        const qs = params.toString();
        return {
          url: `/campaigns/all-call-logs${qs ? `?${qs}` : ""}`,
          method: "GET",
        };
      },
      providesTags: [tags.campaigns],
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
  useGetCallHistoryQuery,
  useGetAllCallLogsQuery,
} = campaignApi;

export default campaignApi;