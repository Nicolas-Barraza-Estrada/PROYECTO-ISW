//productosUsados.routes.js
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createProductosUsados,
    updateProductosUsados
} from "../controllers/productosUsados.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .post("/crear/", createProductosUsados)
    .put("/actualizar/", updateProductosUsados);

export default router;