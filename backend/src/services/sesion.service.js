"use strict";
import Sesion from '../entity/sesion.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { formatToLocalTime } from '../utils/formatDate.js';

export async function createSesionService(dataSesion) {
    try {
        const sesionRepository = AppDataSource.getRepository(Sesion);

        const newSesion = sesionRepository.create(dataSesion);
        await sesionRepository.save(newSesion);

        return newSesion;
    } catch (error) {
        console.error("Error al crear la sesión:", error);
        throw new Error("Error interno en el servidor");
    }
}

export async function getSesionService(id_sesion) {
    try {
        const sesionRepository = AppDataSource.getRepository(Sesion);

        const sesionFound = await sesionRepository.findOne({
            where: { id_sesion }
        });

        if (!sesionFound) {
            return null; 
        }

        sesionFound.createdAt = formatToLocalTime(sesionFound.createdAt);
        sesionFound.updatedAt = formatToLocalTime(sesionFound.updatedAt);

        return sesionFound;
    } catch (error) {
        console.error("Error al obtener la sesión:", error);
        throw new Error("Error interno al obtener la sesión"); 
    }
}

export async function getSesionesService() {
    try {
        const sesionRepository = AppDataSource.getRepository(Sesion);
        const sesiones = await sesionRepository.find();

        return sesiones; 
    } catch (error) {
        console.error("Error al obtener las sesiones:", error);
        throw new Error("Error interno al obtener las sesiones"); 
    }
}

export async function updateSesionService(id_sesion, dataSesion) {
    try {
        const sesionRepository = AppDataSource.getRepository(Sesion);

        const sesionFound = await sesionRepository.findOne({
            where: { id_sesion }
        });

        if (!sesionFound) {
            return null; 
        }

        sesionFound.disponibilidad = dataSesion.disponibilidad;
        sesionFound.fecha = dataSesion.fecha;
        sesionFound.nombreSesion = dataSesion.nombreSesion;

        await sesionRepository.save(sesionFound);

        sesionFound.updatedAt = formatToLocalTime(sesionFound.updatedAt); 

        return sesionFound; 
    } catch (error) {
        console.error("Error al actualizar la sesión:", error);
        throw new Error("Error interno al actualizar la sesión"); 
    }
}

export async function deleteSesionService(id_sesion) {
    try {
        const sesionRepository = AppDataSource.getRepository(Sesion);

        const sesionFound = await sesionRepository.findOne({
            where: { id_sesion }
        });

        if (!sesionFound) {
            return null; 
        }

        const sesionDeleted = await sesionRepository.remove(sesionFound); 
        return sesionDeleted; 
    } catch (error) {
        console.error("Error al eliminar la sesión:", error);
        throw new Error("Error interno al eliminar la sesión"); 
    }
}