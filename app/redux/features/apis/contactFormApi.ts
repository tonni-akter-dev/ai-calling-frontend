import baseApi from "../../baseApi";
import { tags } from "../../tags";

const contactFormApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Submit the contact form (Public)
    submitContactForm: builder.mutation({
      query: (data) => ({
        url: "/contactForm",
        method: "POST",
        data,
      }),
      // If you have an admin dashboard to view messages, invalidate its tag
      invalidatesTags: [tags.contactMessages], 
    }),

    // Get all contact messages (Admin only - optional but useful)
    getAllContactMessages: builder.query({
      query: (params) => ({
        url: "/contactForm",
        method: "GET",
        params, // supports ?search=...&status=...
      }),
      providesTags: [tags.contactMessages],
    }),

    // Mark a message as read (Admin only - optional)
    markMessageAsRead: builder.mutation({
      query: (id) => ({
        url: `/contactForm/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: [tags.contactMessages],
    }),
  }),
});

export const {
  useSubmitContactFormMutation,
  useGetAllContactMessagesQuery,
  useMarkMessageAsReadMutation,
} = contactFormApi;

export default contactFormApi;