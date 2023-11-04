import Game from "../models/Game";

interface Props {
  games: Game[];
}

const SteamLibrary = ({ games }: Props) => {
  if (games && games.length === 0) {
    return <p>No games found in Steam library.</p>;
  }

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
        {games.map((game) => (
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

export default SteamLibrary;
