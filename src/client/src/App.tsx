import axios from "axios";
import { useEffect, useState } from "react";
import "./global.css";

interface steamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  rtime_last_played: number;
  // has_community_visible_stats: boolean;
  // playtime_disconnected: number;
}

export default function App() {
  const BASE_URL = window.location.origin;
  const API_URL = BASE_URL.includes("localhost:5173") ? "http://localhost:3000/api" : `${BASE_URL}/api`;

  const HandleGoogleSignin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };
  const handleSteamLink = () => {
    window.location.href = `${API_URL}/auth/steam`;
  };
  const handleLogout = () => {
    axios
      .get(`${API_URL}/auth/logout`, { withCredentials: true })
      .then((res) => {
        window.location.href = `${BASE_URL}`;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [steamGames, setSteamGames] = useState<steamGame[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/library/steam`, { withCredentials: true })
      .then((res) => {
        if (res.data.response.game_count > 0) {
          setSteamGames(res.data.response.games);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <button type="button" onClick={HandleGoogleSignin}>
        Sign In Google
      </button>
      <button type="button" onClick={handleSteamLink}>
        Link Steam
      </button>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      {/* <button type="button" onClick={handleRegisterClickLocal}>
        Register Local
      </button>
      <button type="button" onClick={handleSignInClickLocal}>
        Sign In Local
      </button> */}
      {steamGames.length > 0 && (
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
      )}
    </>
  );
}
