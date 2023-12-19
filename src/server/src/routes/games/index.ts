import axios from "axios";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  if (!req.query.search) {
    return res.status(400).send("Please provide a search query");
  }
  const searchURL = `https://api.rawg.io/api/games?search=${req.query.search}&ordering=-rating&key=${process.env.RAWG_API_KEY}`;
  console.log(searchURL);
  try {
    const response = await axios.get(searchURL);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("No Game ID provided");
  }
  const detailsURL = `https://store.steampowered.com/api/appdetails?appids=${req.params.id}&l=english`;
  try {
    const response = await axios.get(detailsURL);
    res.status(200).send(response.data[req.params.id].data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
