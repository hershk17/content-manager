import Game from "@/models/Game";
import { baseApi } from "@/stores/store";

interface SteamLibraryResponse {
  game_count: number;
  games: Game[];
}

const libraryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    steamLibrary: builder.query<SteamLibraryResponse, void>({
      query: () => ({
        url: "/library/steam",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSteamLibraryQuery } = libraryApi;
