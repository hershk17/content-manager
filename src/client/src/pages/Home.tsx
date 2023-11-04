import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Game from "../models/Game";
import SteamLibrary from "../layouts/SteamLibrary";

const Home = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL;

  const { user, logout } = useContext(AuthContext);
  const [steamGames, setSteamGames] = useState<Game[]>([]);

  const handleSteamLink = () => {
    window.location.href = `${API_URL}/auth/steam`;
  };

  const fetchSteamGames = async () => {
    if (!user || !user?.steamId) return;
    const response = await axios.get(`${API_URL}/library/steam`, { withCredentials: true });
    if (response.data.game_count > 0) {
      setSteamGames(response.data.games);
    }
  };

  useEffect(() => {
    fetchSteamGames();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      Hi {user?.name}!, your current username is {user?.username}! <br /> <br />
      <button type="button" onClick={logout}>
        Logout
      </button>
      <h3>Your Steam Library</h3>
      {user?.steamId ? (
        <SteamLibrary games={steamGames} />
      ) : (
        <button type="button" onClick={handleSteamLink}>
          Connect Steam
        </button>
      )}
    </div>
  );
};

export default Home;
