import { baseApi } from "../../stores/store";

const libraryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    steam: builder.mutation({
      query: () => ({
        url: "/auth/steam",
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useSteamMutation } = libraryApi;
