import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), `../../.env`) });

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import routes from "./routes";

import { IUser, User } from "./models/user";
import "./passport";

// Create the express app
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 360000,
      secure: false,
    },
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Set up Mongoose connection to MongoDB database
const DB_URL = process.env.MONGO_URI;
mongoose
  .connect(DB_URL!)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  const currUser = user as IUser;
  done(null, currUser.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

// Routes
app.use("/api", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
