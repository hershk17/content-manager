import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my test application." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));