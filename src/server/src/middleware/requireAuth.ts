import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser } from "../models/user";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: IUser, info: { message: string }) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send("Unauthorized");
      }
      req.user = user as IUser;
      return next();
    }
  )(req, res, next);
};

export default requireAuth;
