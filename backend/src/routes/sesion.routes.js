import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { Router } from "express";
import {
    createSesion,
    getSesion,
    getSesiones,
    deleteSesion,
    updateSesion
}from "../controllers/sesion.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);


router.post('/', createSesion);
router.get('/all', getSesiones);
router.get('/:id_sesion', getSesion);
router.put('/:id_sesion', updateSesion);
router.delete('/:id_sesion', deleteSesion);


export default router;
