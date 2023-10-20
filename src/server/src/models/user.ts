import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import mongoose, { Document, Schema } from "mongoose";
import { join } from "path";
import { isValidUrl } from "../services/validators";

const isProduction = process.env.NODE_ENV === "production";
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;
const IMAGES_FOLDER_PATH = "/public/images/";

export interface IUser {
  provider?: string;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  avatar?: string;
  role?: string;
  bio?: string;
  googleId?: string;
}

export interface IUserDocument extends IUser, Document {
  toJSON(): IUserDocument;
  generateJWT(): string;
  registerUser(newUser: IUserDocument, callback: Function): void;
  comparePassword(candidatePassword: string, callback: Function): void;
}

const userSchema: Schema<IUserDocument> = new Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9_]+$/, "is invalid"],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60,
    },
    name: String,
    avatar: String,
    role: { type: String, default: "USER" },
    bio: String,
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  // if not exists avatar1 default
  const absoluteAvatarFilePath = `${join(__dirname, "../..", "/public/images/")}${this.avatar}`;
  const avatar = isValidUrl(this.avatar)
    ? this.avatar
    : fs.existsSync(absoluteAvatarFilePath)
    ? `${IMAGES_FOLDER_PATH}${this.avatar}`
    : `${IMAGES_FOLDER_PATH}avatar2.jpg`;

  return {
    id: this._id,
    provider: this.provider,
    email: this.email,
    username: this.username,
    avatar: avatar,
    name: this.name,
    role: this.role,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      expiresIn: "24h",
      id: this._id,
      provider: this.provider,
      email: this.email,
    },
    secretOrKey!
  );
  return token;
};

userSchema.methods.registerUser = function (newUser: IUserDocument, callback: Function) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password!, salt, (errh, hash) => {
      if (err) {
        console.log(err);
      }
      // set pasword to hash
      newUser.password = hash;
      newUser
        .save()
        .then((user) => callback(user, null))
        .catch((err) => callback(null, err));
    });
  });
};

userSchema.methods.comparePassword = function (candidatePassword: string, callback: Function) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

export default mongoose.model("User", userSchema);

// export async function hashPassword(password: string) {
//   const saltRounds = 10;

//   const hashedPassword = await new Promise((resolve, reject) => {
//     bcrypt.hash(password, saltRounds, function (err, hash) {
//       if (err) reject(err);
//       else resolve(hash);
//     });
//   });

//   return hashedPassword;
// }

// export const validateUser = (user) => {
//   const schema = {
//     avatar: Joi.any(),
//     name: Joi.string().min(2).max(30).required(),
//     username: Joi.string()
//       .min(2)
//       .max(20)
//       .regex(/^[a-zA-Z0-9_]+$/)
//       .required(),
//     password: Joi.string().min(6).max(20).allow("").allow(null),
//   };

//   return schema.validate(user);
// };
