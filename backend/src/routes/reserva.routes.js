import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createReserva,
    getReserva,
    getReservas,
    deleteReserva,
    updateReserva
}from "../controllers/reserva.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router.post('/', createReserva);
router.get('/all', getReservas);
router.get('/:id_sesion/:rut_usuario', getReserva);
router.put('/:id_sesion/:rut_usuario', updateReserva);
router.delete('/:id_sesion/:rut_usuario', deleteReserva);


export default router;