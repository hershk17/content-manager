const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/getData", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;