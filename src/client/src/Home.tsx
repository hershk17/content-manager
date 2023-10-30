import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";

interface steamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  rtime_last_played: number;
}

function App() {
  const { user, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [steamGames, setSteamGames] = useState<steamGame[]>([]);

  const API_URL = import.meta.env.VITE_SERVER_URL;

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const handleSteamLink = () => {
    window.location.href = `${API_URL}/auth/steam`;
  };

  const handleLogout = () => {
    axios
      .get(`${API_URL}/auth/logout`, { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      Hi {user?.name}!, your username is {user?.username}! <br /> <br />
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <h2>Your Library</h2>
      {!user?.steamId ? (
        <div>
          <button type="button" onClick={handleSteamLink}>
            Connect Steam
          </button>
        </div>
      ) : (
        <div>
          {steamGames.length === 0 ? (
            <span>You have no games in your steam library.</span>
          ) : (
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
        </div>
      )}
    </>
  );
}

export default App;
