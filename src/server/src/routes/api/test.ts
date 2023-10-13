import express from "express";
import get from "axios";

const router = express.Router();

router.get("/getData", async (req, res) => {
  await get("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => res.json(response.data))
    // return 404 if not found
    .catch(() => res.status(404).json({ error: "Internal Server Error" }));
});

export default router;
