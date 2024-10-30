"use strict";
import Sesion from '../entity/sesion.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { formatToLocalTime } from '../utils/formatDate.js';

export async function createSesionService(dataSesion) {
    try {
        const sesionRepository = AppDataSource.getRepository(Sesion);

        // Verifica si ya existe una sesión en la misma fecha con disponibilidad true
        const existingSesion = await sesionRepository.findOne({
            where: {
                fecha: dataSesion.fecha,
                disponibilidad: true
            }
        });

        if (existingSesion) {
            console.log("Sesión con fecha duplicada encontrada. Marcando como no disponible.");
            // Si ya existe una sesión disponible en esa fecha, la nueva será false
            dataSesion.disponibilidad = false;
        }

        // Crea y guarda la nueva sesión
        const newSesion = sesionRepository.create(dataSesion);
        await sesionRepository.save(newSesion);

        return newSesion;
    } catch (error) {
        console.error("Error al crear la sesión:", error);
        throw new Error("Error interno en el servidor");
    }
}
// Servicio para obtener una sesión por ID
export async function getSesionService(id_sesion) {
    try {
        const sesionRepository = AppDataSource.getRepository(Sesion);

        const sesionFound = await sesionRepository.findOne({
            where: { id_sesion }
        });

        if (!sesionFound) {
            return null; // Devuelve null si no se encuentra la sesión
        }

        sesionFound.createdAt = formatToLocalTime(sesionFound.createdAt);
        sesionFound.updatedAt = formatToLocalTime(sesionFound.updatedAt);

        return sesionFound; // Devuelve la sesión encontrada
    } catch (error) {
        console.error("Error al obtener la sesión:", error);
        throw new Error("Error interno al obtener la sesión"); // Lanza un error si ocurre una excepción
    }
}

// Servicio para obtener todas las sesiones
export async function getSesionesService() {
    try {
        const sesionRepository = AppDataSource.getRepository(Sesion);
        const sesiones = await sesionRepository.find();

        return sesiones; // Devuelve las sesiones encontradas
    } catch (error) {
        console.error("Error al obtener las sesiones:", error);
        throw new Error("Error interno al obtener las sesiones"); // Lanza un error para ser manejado en el controlador
    }
}

// Servicio para actualizar una sesión por ID
export async function updateSesionService(id_sesion, dataSesion) {
    try {
        const sesionRepository = AppDataSource.getRepository(Sesion);

        const sesionFound = await sesionRepository.findOne({
            where: { id_sesion }
        });

        if (!sesionFound) {
            return null; // Si no se encuentra la sesión
        }

        // Actualiza los campos de la sesión
        sesionFound.disponibilidad = dataSesion.disponibilidad;
        sesionFound.fecha = dataSesion.fecha;

        await sesionRepository.save(sesionFound);

        sesionFound.updatedAt = formatToLocalTime(sesionFound.updatedAt); // Formateo de la fecha

        return sesionFound; // Devuelve la sesión actualizada
    } catch (error) {
        console.error("Error al actualizar la sesión:", error);
        throw new Error("Error interno al actualizar la sesión"); // Lanza el error para manejarlo en el controlador
    }
}

// Servicio para eliminar una sesión por ID
export async function deleteSesionService(id_sesion) {
    try {
        const sesionRepository = AppDataSource.getRepository(Sesion);

        const sesionFound = await sesionRepository.findOne({
            where: { id_sesion }
        });

        if (!sesionFound) {
            return null; // Si no se encuentra la sesión
        }

        const sesionDeleted = await sesionRepository.remove(sesionFound); // Elimina la sesión encontrada
        return sesionDeleted; // Devuelve la sesión eliminada
    } catch (error) {
        console.error("Error al eliminar la sesión:", error);
        throw new Error("Error interno al eliminar la sesión"); // Lanza el error para manejarlo en el controlador
    }
}