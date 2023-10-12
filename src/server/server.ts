import express from "express";
import { connect } from "mongoose";
import { mongodbURI as db } from "../../config/keys";
import items from "./routes/api/items";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/items", items);

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use((req, res, next) => {
    if (req.secure) next();
    else res.redirect(`https://'${req.headers.host}${req.url}`);
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

connect(db, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error", err));