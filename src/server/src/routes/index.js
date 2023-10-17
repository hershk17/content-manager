import { Router } from "express";
import authRoutes from "./auth/index.js";

const router = Router();

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

export default router;
