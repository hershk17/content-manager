import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { resolve } from "path";

dotenv.config({
  path: resolve(process.cwd(), `./config/.env.${process.env.NODE_ENV}`),
});

import routes from "./routes";
import "./services/passport";

const app = express();

const port = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.VITE_CLIENT_URL,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Initialize Passport.js
app.use(passport.initialize());

// Set up Mongoose connection to MongoDB database
mongoose
  .connect(DB_URL!)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
