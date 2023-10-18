import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

export default router;
