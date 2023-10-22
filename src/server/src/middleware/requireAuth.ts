import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const requireJwtAuth = passport.authenticate("jwt", { session: false });

export const requireLocalAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: Error, user: Express.User | undefined, info: Object | undefined) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).send(info);
    }
    req.user = user;
    next();
  })(req, res, next);
};
