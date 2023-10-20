import { Router } from "express";
import authRoutes from "./auth";

const router = Router();

// routes go here
router.use("/auth", authRoutes);

export default router;
