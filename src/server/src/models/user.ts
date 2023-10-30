import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  username: string; // UNIQUE IDENTIFIER
  email: string;
  password: string;
  name: string;
  avatar: string;
  provider: string;
  googleId: string;
  steamId: string;
  facebookId: string;
  twitterId: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9_]+$/, "is invalid"],
      index: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60,
    },
    name: {
      type: String,
      index: true,
    },
    avatar: String,
    provider: {
      type: String,
      index: true,
    },
    googleId: {
      type: String,
      sparse: true,
    },
    steamId: {
      type: String,
      sparse: true,
    },
    facebookId: {
      type: String,
      sparse: true,
    },
    twitterId: {
      type: String,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
