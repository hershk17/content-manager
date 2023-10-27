import { Router } from "express";
import authRoutes from "./auth";
import libraryRoutes from "./library";
import authenticate from "../middleware/authenticate";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Hello World!");
});

// routes go here
router.use("/auth", authRoutes);

router.use("/library", authenticate, libraryRoutes);

export default router;
