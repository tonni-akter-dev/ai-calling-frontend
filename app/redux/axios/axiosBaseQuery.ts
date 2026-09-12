import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }): BaseQueryFn<AxiosRequestConfig, unknown, unknown> =>
  async ({ url, method, data, params, headers, responseType }, { signal }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        responseType,
        signal,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };