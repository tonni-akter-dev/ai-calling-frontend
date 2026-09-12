// app/redux/baseApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios/axiosBaseQuery";
import { tagsArray } from "./tags";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: tagsArray,
  endpoints: () => ({}),
});

export default baseApi;