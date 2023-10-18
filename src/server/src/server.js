import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";
import https from "https";
import mongoose from "mongoose";
import passport from "passport";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import testRoutes from "./routes/test.js";
import authRoutes from "./routes/auth.js"

// import "./services/facebookStrategy.js";
import "./services/googleStrategy.js";
import "./services/jwtStrategy.js";
import "./services/localStrategy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());

// DB Config
const isProduction = process.env.NODE_ENV === "production";
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// DB Connection
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
    // seedDb();
  })
  .catch((err) => console.log(err));

// Routes
app.use("/", testRoutes);
app.use("/auth", authRoutes);

// Server
if (isProduction) {
  app.listen(port, () => console.log(`(prod) Listening on port ${port}`));
} else {
  const httpsOptions = {
    key: readFileSync(resolve(__dirname, "../security/cert.key")),
    cert: readFileSync(resolve(__dirname, "../security/cert.pem")),
  };
  https.createServer(httpsOptions, app).listen(port, () => {
    console.log("(dev) Listening on port " + port);
  });
}
