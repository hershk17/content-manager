import { Router } from "express";
import localAuthRoutes from "./localAuth.js";
import googleAuthRoutes from "./googleAuth.js";
import facebookAuthRoutes from "./facebookAuth.js";

const router = Router();

router.use("/", localAuthRoutes);
router.use("/", googleAuthRoutes);
router.use("/", facebookAuthRoutes);

export default router;