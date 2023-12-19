import { Router } from "express";
import authRoutes from "./auth";
import gamesRoutes from "./games";
import libraryRoutes from "./library";

const router = Router();

// test route
router.get("/", (_req, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRoutes);
router.use("/games", gamesRoutes);
router.use("/library", libraryRoutes);

export default router;
