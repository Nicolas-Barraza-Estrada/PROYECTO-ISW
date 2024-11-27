import { Router } from 'express';
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    getAsistencias,
    createAsistencia,
    updateAsistencia,
} from "../controllers/asistencia.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router.get('/', getAsistencias); // Ruta para obtener todas las asistencias
router.post('/', createAsistencia); // Ruta para crear una nueva asistencia
router.put('/:id', updateAsistencia); // Ruta para actualizar una asistencia por id

export default router; 
