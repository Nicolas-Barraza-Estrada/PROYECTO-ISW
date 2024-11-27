//inventary.routes.js
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createInventary,
    getInventary,
    updateInventary
} from "../controllers/inventory.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .post("/", createInventary)
    .get("/", getInventary)
    .put("/", updateInventary)

export default router;