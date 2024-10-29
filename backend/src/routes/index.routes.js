"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import inventaryRouter from "./inventary.routes.js";
import ordenesRoutes from "./ordenes.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/inventory", inventaryRouter)
    .use("/ordenes", ordenesRoutes);

export default router;