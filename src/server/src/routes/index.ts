import { Router } from "express";
import authRoutes from "./auth";
import libraryRoutes from "./library";

const router = Router();

// test route
router.get("/", (_req, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRoutes);
router.use("/library", libraryRoutes);

export default router;
