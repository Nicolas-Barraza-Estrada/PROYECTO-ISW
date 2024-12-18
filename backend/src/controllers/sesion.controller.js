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

export async function createSesion(req, res) {
    try {
        const sesionData = req.body;

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

export async function getSesion(req, res) {
    try {
        const id = req.params.id_sesion;

        console.log("Recibiendo ID de sesión:", id);
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
        const sesiones = await getSesionesService(); 

        if (!sesiones || sesiones.length === 0) {
            return handleErrorClient(res, 404, "No se encontraron sesiones"); 
        }

        handleSuccess(res, 200, "Sesiones encontradas", sesiones); 
    } catch (error) {
        console.error('Error al obtener las sesiones:', error);
        handleErrorServer(res, 500, "Error interno en el servidor"); 
    }
}

export async function updateSesion(req, res) {
    try {
        const id = req.params.id_sesion; 
        const sesion = req.body; 

        const { value, error } = sesionBodyValidation.validate(sesion); 

        if (error) {
            return handleErrorClient(res, 400, error.message); 
        }

        const sesionUpdated = await updateSesionService(id, value); 

        if (!sesionUpdated) {
            return handleErrorClient(res, 404, "Sesión no encontrada"); 
        }

        handleSuccess(res, 200, "Sesión actualizada correctamente", sesionUpdated); 
    } catch (error) {
        console.error("Error al actualizar una sesión: ", error);
        handleErrorServer(res, 500, "Error interno en el servidor");
    }
}


export async function deleteSesion(req, res) {
    try {
        const id = req.params.id_sesion; 

        const sesionDeleted = await deleteSesionService(id); 

        if (!sesionDeleted) {
            return handleErrorClient(res, 404, "Sesión no encontrada"); 
        }

        handleSuccess(res, 200, "Sesión eliminada correctamente", sesionDeleted); 
    } catch (error) {
        console.error("Error al eliminar una sesión: ", error);
        handleErrorServer(res, 500, "Error interno en el servidor");
    }
}