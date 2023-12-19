import { baseApi } from "@/stores/store";

const gamesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: add interface for game details
    gameDetails: builder.query<any, string>({
      query: (gameId) => ({
        url: `/games/${gameId}`,
        method: "GET",
      }),
    }),
    gameSearch: builder.query<any, string>({
      query: (searchQuery) => ({
        url: "/games",
        method: "GET",
        params: {
          search: searchQuery,
        },
      }),
    }),
  }),
});

export const { useGameDetailsQuery, useLazyGameSearchQuery } = gamesApi;
