"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import inventaryRouter from "./inventary.routes.js";
import ordenesRoutes from "./ordenes.routes.js";
import productosUsadosRoutes from "./productosUsados.routes.js";
import reservaRoutes from "./reserva.routes.js";
import sesionRoutes from "./sesion.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/inventory", inventaryRouter)
    .use("/ordenes", ordenesRoutes)
    .use("/productosUsados", productosUsadosRoutes)
    .use("/sesion", sesionRoutes)
    .use("/reserva", reservaRoutes);

export default router;