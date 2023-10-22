import { Router } from "express";
import authRoutes from "./auth";

const router = Router();

// routes go here
router.use("/auth", authRoutes);

// test route
router.get("/api/test", (req: any, res) => {
  res.json("Hello World");
});

export default router;
