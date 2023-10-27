import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  provider: string;
  name: string;
  avatar: string;
  email: string;
  username: string;
  password: string;
  googleId: string;
  steamId: string;
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    avatar: String,
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true,
    },
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9_]+$/, "is invalid"],
      index: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    steamId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
