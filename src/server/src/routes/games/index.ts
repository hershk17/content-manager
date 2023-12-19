import axios from "axios";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  if (!req.query.id) {
    return res.status(400).send("No Game ID provided");
  }
  const detailsURL = `https://store.steampowered.com/api/appdetails?appids=${req.query.id}&l=english`;
  try {
    const response = await axios.get(detailsURL);
    res.status(200).send(response.data[req.query.id.toString()].data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
