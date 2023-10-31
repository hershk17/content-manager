import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

interface steamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  rtime_last_played: number;
}

export default function Home() {
  const API_URL = import.meta.env.VITE_SERVER_URL;

  const { user, logout } = useContext(AuthContext);
  const [steamGames, setSteamGames] = useState<steamGame[]>([]);

  const handleSteamLink = () => {
    window.location.href = `${API_URL}/auth/steam`;
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!user?.steamId) return;
    axios
      .get(`${API_URL}/library/steam`, { withCredentials: true })
      .then((res) => {
        if (res.data.game_count > 0) {
          setSteamGames(res.data.games);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const SteamLibrary = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>App Id</th>
            <th>Game</th>
            <th>Hours Played</th>
            <th>Last Played</th>
          </tr>
        </thead>
        <tbody>
          {steamGames.map((game) => (
            <tr key={game.appid}>
              <td>{game.appid}</td>
              <td>
                <img
                  src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                  alt={`${game.name} icon`}
                />
                {game.name}
              </td>
              <td>{Math.round(game.playtime_forever / 60)}</td>
              <td>{new Date(game.rtime_last_played * 1000).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      Hi {user?.name}!, your current username is {user?.username}! <br /> <br />
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <h2>Your Steam Library</h2>
      {!user?.steamId ? (
        <button type="button" onClick={handleSteamLink}>
          Connect Steam
        </button>
      ) : (
        <div>{steamGames.length >= 0 ? <SteamLibrary /> : <span>You have no games in your steam library.</span>}</div>
      )}
    </div>
  );
}
