import { Request } from "express";

export const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && (req.cookies || req.headers)) {
    token = req.cookies["x-auth-token"] ?? req.headers["x-auth-token"];
  }
  return token;
};
