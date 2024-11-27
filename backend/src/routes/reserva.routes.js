import { Router } from "express";
import {
    createReserva,
    getReserva,
    getReservas,
    deleteReserva,
    updateReserva
}from "../controllers/reserva.controller.js";

const router = Router();

router.post('/', createReserva);
router.get('/all', getReservas);
router.get('/:id_sesion/:rut_usuario', getReserva);
router.put('/:id_sesion/:rut_usuario', updateReserva);
router.delete('/:id_sesion/:rut_usuario', deleteReserva);


export default router;