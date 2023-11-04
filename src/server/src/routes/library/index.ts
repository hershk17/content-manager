import { Router } from "express";
import requireAuth from "../../middleware/requireAuth";
import steamLibraryRoutes from "../library/steam";

const router = Router();

router.use("/", requireAuth, steamLibraryRoutes);

export default router;
