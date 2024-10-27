//inventary.routes.js
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createInventary,
} from "../controllers/inventary.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
//    .get("/", getInventaries,)
//    .get("/detail/", getInventary)
    .post("/crear/", createInventary)

export default router;