"use strict";
import Sesion from '../entity/sesion.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { sesionBodyValidation } from '../validations/sesion.validation.js';
import { createSesionService, getSesionService, updateSesionService, deleteSesionService, getSesionesService} from '../services/sesion.service.js';
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
  } from "../handlers/responseHandlers.js";

// Crear una nueva sesión
export async function createSesion(req, res) {
    try {
        const sesionData = req.body;

        // Validar el cuerpo de la solicitud
        const { value, error } = sesionBodyValidation.validate(sesionData);
        if (error) {
            return handleErrorClient(res, 400, error.details[0].message);
        }

        const newSesion = await createSesionService(value);
        handleSuccess(res, 201, "Sesión creada correctamente", newSesion);
    } catch (error) {
        console.error("Error al crear una sesión:", error);
        handleErrorServer(res, 500, "Error interno en el servidor");
    }
}

// Obtener una sesión por ID
export async function getSesion(req, res) {
    try {
        const id = req.params.id_sesion;

        console.log("Recibiendo ID de sesión:", id); // Log para depuración
        const sesionFound = await getSesionService(id);

        if (!sesionFound) {
            return handleErrorClient(res, 404, "Sesión no encontrada");
        }

        handleSuccess(res, 200, "Sesión encontrada", sesionFound);
    } catch (error) {
        console.error('Error al obtener la sesión: ', error);
        handleErrorServer(res, 500, "Error interno en el servidor");
    }
}


export async function getSesiones(req, res) {
    try {
        const sesiones = await getSesionesService(); // Llama al servicio para obtener sesiones

        if (!sesiones || sesiones.length === 0) {
            return handleErrorClient(res, 404, "No se encontraron sesiones"); // Manejo de error
        }

        handleSuccess(res, 200, "Sesiones encontradas", sesiones); // Manejo de éxito
    } catch (error) {
        console.error('Error al obtener las sesiones:', error);
        handleErrorServer(res, 500, "Error interno en el servidor"); // Manejo de error en el servidor
    }
}

// Actualizar una sesión por ID
export async function updateSesion(req, res) {
    try {
        const id = req.params.id_sesion; // Obtiene el ID de la sesión desde los parámetros
        const sesion = req.body; // Obtiene los datos de la sesión del cuerpo de la solicitud

        const { value, error } = sesionBodyValidation.validate(sesion); // Valida los datos

        if (error) {
            return handleErrorClient(res, 400, error.message); // Manejo de errores de validación
        }

        const sesionUpdated = await updateSesionService(id, value); // Llama al servicio para actualizar la sesión

        if (!sesionUpdated) {
            return handleErrorClient(res, 404, "Sesión no encontrada"); // Manejo de error si no se encuentra la sesión
        }

        handleSuccess(res, 200, "Sesión actualizada correctamente", sesionUpdated); // Manejo de éxito
    } catch (error) {
        console.error("Error al actualizar una sesión: ", error);
        handleErrorServer(res, 500, "Error interno en el servidor"); // Manejo de errores del servidor
    }
}


export async function deleteSesion(req, res) {
    try {
        const id = req.params.id_sesion; // Obtiene el ID de la sesión desde los parámetros

        const sesionDeleted = await deleteSesionService(id); // Llama al servicio para eliminar la sesión

        if (!sesionDeleted) {
            return handleErrorClient(res, 404, "Sesión no encontrada"); // Manejo de error si no se encuentra la sesión
        }

        handleSuccess(res, 200, "Sesión eliminada correctamente", sesionDeleted); // Manejo de éxito
    } catch (error) {
        console.error("Error al eliminar una sesión: ", error);
        handleErrorServer(res, 500, "Error interno en el servidor"); // Manejo de errores del servidor
    }
}