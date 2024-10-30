//ordenes.routes.js
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createOrdenes,
    getOrden,
    getOrdenes,
    updateOrden
} from "../controllers/ordenes.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .post("/crear/", createOrdenes)
    .get("/listar/", getOrdenes)
    .get("/buscar/", getOrden)
    .put("/actualizar/", updateOrden);


export default router;