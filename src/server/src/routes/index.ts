import { Router } from "express";
import authRoutes from "./auth";

const router = Router();

router.use("/auth", authRoutes);

export default router;
