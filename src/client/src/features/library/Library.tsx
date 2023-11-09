import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Game from "../../models/Game";
import { AppDispatch, RootState } from "../../stores/store";
import { logout } from "../auth/authSlice";
import SteamLibrary from "./components/GamesList";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const API_URL = import.meta.env.VITE_SERVER_URL;
  const [steamGames, setSteamGames] = useState<Game[]>([]);

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

  return (
    <div>
      <h2>Home</h2>
      Hi {user?.name}!, your current username is {user?.username}! <br /> <br />
      <button type="button" onClick={() => dispatch(logout())}>
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
