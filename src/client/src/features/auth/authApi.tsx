import User from "@/models/User";
import { baseApi } from "@/stores/store";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    validate: builder.query<User, void>({
      query: () => ({
        url: "/auth/validate",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        responseHandler: "text",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
        responseHandler: "text",
        credentials: "include",
      }),
    }),
    logout: builder.mutation<JSON, void>({
      query: () => ({
        url: "/auth/logout",
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
  useLogoutMutation,
} = authApi;
