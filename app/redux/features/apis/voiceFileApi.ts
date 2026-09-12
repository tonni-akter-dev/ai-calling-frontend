import {
  DeleteVoiceFileResponse,
  UploadVoiceFileResponse,
  VoiceFileResponse,
  VoiceFileSearchParams,
} from "@/app/utils/type";
import baseApi from "../../baseApi";
import { tags } from "../../tags";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // Get Voice Files
    // =========================
    getVoiceFiles: builder.query({
      query: () => ({
        url: "/voice-files",
        method: "GET",
      }),
      providesTags: [tags.voiceFiles],
    }),

    // =========================
    // Upload Voice File
    // =========================
    uploadVoiceFile: builder.mutation<UploadVoiceFileResponse, FormData>({
      query: (data) => ({
        url: "/voice-files/upload",
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tags.voiceFiles],
    }),

    // =========================
    // Delete Voice File
    // =========================
    deleteVoiceFile: builder.mutation<DeleteVoiceFileResponse, number>({
      query: (id) => ({
        url: `/voice-files/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.voiceFiles],
    }),
  }),
});

export const {
  useGetVoiceFilesQuery,
  useUploadVoiceFileMutation,
  useDeleteVoiceFileMutation,
} = api;
