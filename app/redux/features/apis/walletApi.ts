/* eslint-disable @typescript-eslint/no-explicit-any */
// app/redux/features/apis/walletApi.ts
import baseApi from "../../baseApi";
import { tags } from "../../tags";

export interface WalletInfo {
  balance: number;
  currency: string;
  isActive: boolean;
  ratePerMinute?: number;
}

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  balance_after: number;
  reference_type: string;
  reference_id: string;
  note: string;
  created_at: string;
}

export interface BkashPaymentResponse {
  success: boolean;
  paymentID: string;
  bkashURL: string;
  message?: string;
  statusCode?: string;
  statusMessage?: string;
  transactionStatus?: string;
  // bKash থেকে আসা অতিরিক্ত ফিল্ড
  callbackURL?: string;
  successCallbackURL?: string;
  failureCallbackURL?: string;
  cancelledCallbackURL?: string;
  amount?: string;
  merchantInvoiceNumber?: string;
}

const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get wallet balance
    getWalletBalance: builder.query<WalletInfo, void>({
      query: () => ({
        url: "/wallet",
        method: "GET",
      }),
      providesTags: [tags.wallet],
    }),

    // Get transactions history
    getTransactions: builder.query<Transaction[], { limit?: number }>({
      query: ({ limit = 50 }) => ({
        url: `/wallet/transactions?limit=${limit}`,
        method: "GET",
      }),
      providesTags: [tags.wallet],
    }),

    // Initiate topup (bKash payment)
    initiateTopup: builder.mutation<
      BkashPaymentResponse,
      { amount: number }
    >({
      query: (data) => ({
        url: "/wallet/topup",
        method: "POST",
        data,
      }),
      invalidatesTags: [tags.wallet],
      // Response transform - ensure bkashURL is properly formatted
      transformResponse: (response: any) => {
        console.log("📦 Raw initiateTopup response:", response);
        
        // Ensure bkashURL exists and is properly formatted
        if (response.bkashURL) {
          // If URL doesn't start with http, add https
          if (!response.bkashURL.startsWith('http://') && !response.bkashURL.startsWith('https://')) {
            response.bkashURL = `https://${response.bkashURL}`;
          }
          console.log("✅ Formatted bkashURL:", response.bkashURL);
        } else {
          console.warn("⚠️ No bkashURL in response:", response);
        }
        
        return response;
      },
    }),

    // Check payment status (optional)
    checkPaymentStatus: builder.query<
      { success: boolean; status: string; amount?: number },
      string
    >({
      query: (paymentId) => ({
        url: `/wallet/payment-status/${paymentId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetWalletBalanceQuery,
  useGetTransactionsQuery,
  useInitiateTopupMutation,
  useCheckPaymentStatusQuery,
} = walletApi;

export default walletApi;