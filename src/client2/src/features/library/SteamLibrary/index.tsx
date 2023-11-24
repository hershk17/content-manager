import { faker } from "@faker-js/faker";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import Game from "../../../models/Game";
import { RootState } from "../../../stores/store";

export const SteamLibrary = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const API_URL = import.meta.env.VITE_SERVER_URL;
  const [steamGames, setSteamGames] = useState<Game[] | undefined>(undefined);

  const handleSteamLink = () => {
    window.location.href = `${API_URL}/auth/steam`;
  };

  useEffect(() => {
    const fetchSteamGames = async () => {
      if (!user || !user?.steamId) return;
      const response = await axios.get(`${API_URL}/library/steam`, {
        withCredentials: true,
      });
      if (response.data.game_count > 0) {
        setSteamGames(response.data.games);
      }
    };

    fetchSteamGames();
  }, []);

  const renderContent = () => {
    if (!user?.steamId) {
      return (
        <button type="button" onClick={handleSteamLink}>
          Connect Steam
        </button>
      );
    }

    if (!steamGames) {
      return <p>Loading...</p>;
    }

    if (steamGames.length === 0) {
      return <p>No games found in Steam library.</p>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Steam Library</title>
      </Helmet>
      Steam Library
    </>
  );
};
