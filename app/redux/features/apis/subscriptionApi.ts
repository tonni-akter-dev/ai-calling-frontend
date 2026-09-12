import baseApi from "../../baseApi";
import { tags } from "../../tags";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all subscriptions (Admin only)
    getAllSubscriptions: builder.query({
      query: () => ({
        url: "/subscriptions/admin/all",
        method: "GET",
      }),
      providesTags: [tags.subscriptions],
    }),

    // Get subscription by ID (Admin only)
    getSubscriptionById: builder.query({
      query: (id) => ({
        url: `/subscriptions/admin/${id}`,
        method: "GET",
      }),
      providesTags: [tags.subscriptions],
    }),

    // Get subscription statistics (Admin only)
    getSubscriptionStats: builder.query({
      query: () => ({
        url: "/subscriptions/admin/stats",
        method: "GET",
      }),
      providesTags: [tags.subscriptions],
    }),

    // Get all plans
    getPlans: builder.query({
      query: () => ({
        url: "/subscriptions/plans",
        method: "GET",
      }),
      providesTags: [tags.plans],
    }),

    // Get current user's subscription
    getMySubscription: builder.query({
      query: () => ({
        url: "/subscriptions/me",
        method: "GET",
      }),
      providesTags: [tags.subscriptions],
    }),

    // Initiate subscription
    initiateSubscription: builder.mutation({
      query: (data) => ({
        url: "/subscriptions/subscribe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.subscriptions],
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useGetSubscriptionStatsQuery,
  useGetPlansQuery,
  useGetMySubscriptionQuery,
  useInitiateSubscriptionMutation,
} = subscriptionApi;

export default subscriptionApi;