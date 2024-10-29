//productosUsados.routes.js
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createProductosUsados
} from "../controllers/productosUsados.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .post("/crear/", createProductosUsados);

export default router;