import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  steamId: string;
  username: string;
  avatar: string;
}

const userSchema = new Schema<IUser>(
  {
    steamId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: String,
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
