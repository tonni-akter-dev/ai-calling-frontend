import baseApi from "../../baseApi";

export interface Contact {
  id: number;
  name: string | null;
  phone: string;
  email: string | null;
  group: string;
  status: "Active" | "Unsubscribed" | "Bounced";
  dateAdded: string;
}

export interface ContactMetrics {
  totalContacts: number;
  activeReachable: number;
  unsubscribed: number;
  bounced: number;
}

export interface ContactListResponse {
  contacts: Contact[];
  metrics: ContactMetrics;
}

export interface CreateContactPayload {
  name: string;
  phone: string;
  email?: string;
  group?: string;
}

export interface UpdateContactPayload {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  group?: string;
  status?: Contact["status"];
}

export interface ContactListParams {
  search?: string;
  group?: string;
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<ContactListResponse, ContactListParams>({
      query: ({ search = "", group = "All" }) => ({
        url: "/contacts",
        method: "GET",
        params: {
          search: search || undefined,
          group: group !== "All" ? group : undefined,
        },
      }),
      providesTags: ["Contacts"],
    }),

    createContact: builder.mutation<
      {
        message: string;
        contact: Contact;
      },
      CreateContactPayload
    >({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Contacts"],
    }),

    updateContact: builder.mutation<
      { message: string },
      UpdateContactPayload
    >({
      query: ({ id, ...data }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Contacts"],
    }),

    deleteContact: builder.mutation<
      { message: string },
      number
    >({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),

    importContactsCsv: builder.mutation<
      {
        message: string;
        importedCount: number;
      },
      FormData
    >({
      query: (formData) => ({
        url: "/contacts/import-csv",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useImportContactsCsvMutation,
} = contactApi;