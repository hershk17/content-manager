import { Router } from "express";
import authRoutes from "./auth";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Hello World!");
});

// routes go here
router.use("/auth", authRoutes);

export default router;
