import dotenv from "dotenv";
import { join, resolve } from "path";
import https from "https";
dotenv.config({ path: resolve(process.cwd(), `../../.env`) });

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import routes from "./routes";

import "./passport";
import { readFileSync } from "fs";

const app = express();

const port = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.REACT_CLIENT_URL,
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

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  // Set static folder
  // nginx will handle this
  app.use(express.static(join(__dirname, "../../client/dist")));

  app.get("*", (req, res) => {
    // index is in /server/src so 2 folders up
    res.sendFile(resolve(__dirname, "../..", "client", "dist", "index.html"));
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
} else {
  const httpsOptions = {
    key: readFileSync(resolve(__dirname, "../security/cert.key")),
    cert: readFileSync(resolve(__dirname, "../security/cert.pem")),
  };

  const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`(https) Listening on port ${port}`);
  });
}
