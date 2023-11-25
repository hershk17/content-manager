import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import User from "../../models/User";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/auth` }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    validate: builder.query<User, void>({
      query: () => ({
        url: "/validate",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        responseHandler: "text",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    steam: builder.mutation({
      query: () => ({
        url: "/steam",
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<JSON, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useValidateQuery,
  useLoginMutation,
  useRegisterMutation,
  useSteamMutation,
  useLogoutMutation,
} = authApi;
