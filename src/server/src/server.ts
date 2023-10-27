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
import MongoStore from "connect-mongo";

import { IUser, User } from "./models/user";
import "./passport";

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

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: DB_URL,
      touchAfter: 24 * 3600,
    }),
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

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

// Set up Mongoose connection to MongoDB database
mongoose
  .connect(DB_URL!)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
