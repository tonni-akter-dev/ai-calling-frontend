import baseApi from "../../baseApi";
import { tags } from "../../tags";

const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // GET TICKET STATS
    // =========================
    getTicketStats: builder.query({
      query: () => ({
        url: "/tickets/stats",
        method: "GET",
      }),
      providesTags: [tags.tickets],
    }),

    // =========================
    // GET ALL TICKETS (Admin)
    // =========================
    getTickets: builder.query({
      query: ({
        search = "",
        category = "",
        status = "",
        priority = "",
        page = 1,
        limit = 10,
      }) => ({
        url: "/tickets",
        method: "GET",
        params: {
          search,
          category,
          status,
          priority,
          page,
          limit,
        },
      }),
      providesTags: [tags.tickets],
    }),

    // =========================
    // GET TICKET BY ID
    // =========================
    getTicketById: builder.query({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: "GET",
      }),
      providesTags: [tags.tickets],
    }),

    // =========================
    // CREATE TICKET
    // =========================
    createTicket: builder.mutation({
      query: (data) => ({
        url: "/tickets",
        method: "POST",
        data,
      }),
      invalidatesTags: [tags.tickets],
    }),

    // =========================
    // UPDATE TICKET STATUS (Admin)
    // =========================
    updateTicketStatus: builder.mutation({
      query: ({ id, status, resolutionNote }) => ({
        url: `/tickets/${id}/status`,
        method: "PATCH",
        data: { status, resolutionNote },
      }),
      invalidatesTags: [tags.tickets],
    }),

    // =========================
    // CANCEL TICKET (User)
    // =========================
    cancelTicket: builder.mutation({
      query: (id) => ({
        url: `/tickets/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: [tags.tickets],
    }),

    // =========================
    // ADD REPLY TO TICKET
    // =========================
    addTicketReply: builder.mutation({
      query: ({ id, message, attachment }) => ({
        url: `/tickets/${id}/reply`,
        method: "POST",
        data: { message, attachment },
      }),
      invalidatesTags: [tags.tickets],
    }),
  }),
});

export const {
  useGetTicketStatsQuery,
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useUpdateTicketStatusMutation,
  useCancelTicketMutation,
  useAddTicketReplyMutation,
} = ticketApi;

export default ticketApi;