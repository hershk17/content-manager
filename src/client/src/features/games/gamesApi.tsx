import { baseApi } from "@/stores/store";

const gamesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: add interface for game details
    gameDetails: builder.query<any, string>({
      query: (gameId) => ({
        url: "/games",
        method: "GET",
        params: {
          id: gameId,
        },
      }),
    }),
  }),
});

export const { useGameDetailsQuery } = gamesApi;
