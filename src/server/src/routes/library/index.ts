import axios from "axios";
import { Router } from "express";
import requireAuth from "../../middleware/requireAuth";
import { IUser } from "../../models/user";

const router = Router();

router.get("/steam", requireAuth, async (req, res) => {
  const user = req.user as IUser;
  const steamLibraryURL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${user.steamId}&format=json&include_appinfo=true&include_played_free_games=true`;
  try {
    const response = await axios.get(steamLibraryURL);
    res.status(200).send(response.data.response);
  } catch (error) {
    // console.error(error);
    res.status(500).send("Error fetching games from Steam");
  }
});

export default router;
