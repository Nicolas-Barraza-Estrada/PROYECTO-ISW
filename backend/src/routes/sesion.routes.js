import { Router } from "express";
import {
    createSesion,
    getSesion,
    getSesiones,
    deleteSesion,
    updateSesion
}from "../controllers/sesion.controller.js";

const router = Router();

router.post('/', createSesion);
router.get('/all', getSesiones);
router.get('/:id_sesion', getSesion);
router.put('/:id_sesion', updateSesion);
router.delete('/:id_sesion', deleteSesion);


export default router;
