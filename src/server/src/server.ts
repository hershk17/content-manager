import dotenv from "dotenv";
import { resolve } from "path";
// dotenv.config({ path: resolve(process.cwd(), `../../.env`) });

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import routes from "./routes";

import "./services/auth/googleStrategy";
import "./services/auth/jwtStrategy";
import "./services/auth/localStrategy";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());

// DB Config
const DB_URL = process.env.MONGO_URI;

// DB Connection
mongoose
  .connect(DB_URL!)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Routes
app.use("/api", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
