import axios from "axios";
import { Router } from "express";
import { IUser } from "../models/user";

const router = Router();

router.get("/steam", async (req, res) => {
  const user = req.user as IUser;
  const steam_url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${user.steamId}&format=json&include_appinfo=true&include_played_free_games=true`;
  try {
    const response = await axios.get(steam_url);
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching games from Steam");
  }
});

export default router;