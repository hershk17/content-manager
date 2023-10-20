import { Router } from "express";
import localAuthRoutes from "./local";
import googleAuthRoutes from "./google";

const router = Router();

router.use("/", localAuthRoutes, googleAuthRoutes);

export default router;
