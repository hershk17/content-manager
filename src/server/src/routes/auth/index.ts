import { Router } from "express";
import localAuthRoutes from "./local";
import googleAuthRoutes from "./google";
import facebookAuthRoutes from "./facebook";

const router = Router();

router.use("/", localAuthRoutes, googleAuthRoutes, facebookAuthRoutes);

export default router;
