import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import authRoutes from "./auth";
import libraryRoutes from "./library";

const router = Router();

// test routes
router.get("/", (_req, res) => {
  res.send("Hello World!");
});

// regular routes
router.use("/auth", authRoutes);

// protected routes
router.get("/validate", requireAuth, (req, res) => {
  return res.status(200).json(req.user);
});
router.use("/library", requireAuth, libraryRoutes);

export default router;
