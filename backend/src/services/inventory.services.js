//inventary.services.js
import Inventary from "../entity/inventary.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getInventaryService(query) {
    try {
        const { id, name } = query;
    
        const inventaryRepository = AppDataSource.getRepository(Inventary);
    
        const inventaryFound = await inventaryRepository.findOne({
        where: [{ id: id }, { name: name }],
        });
    
        if (!inventaryFound) return [null, "Artículo no encontrado"];
    
        const { ...inventaryData } = inventaryFound;
    
        return [inventaryData, null];
    } catch (error) {
        console.error("Error obtener el Artículo:", error);
        return [null, "Error interno del servidor"];
    }
    }

export async function getInventariesService() {
    try {
        const inventaryRepository = AppDataSource.getRepository(Inventary);
    
        const inventaries = await inventaryRepository.find();
    
        if (!inventaries || inventaries.length === 0) return [null, "No hay Artículos"];
    
        const inventariesData = inventaries.map(({ ...inventary }) => inventary);
    
        return [inventariesData, null];
    } catch (error) {
        console.error("Error al obtener a los Artículos:", error);
        return [null, "Error interno del servidor"];
    }
    }

export async function updateInventaryService(query, body) {
    try {
        const { id, name } = query;
    
        const inventaryRepository = AppDataSource.getRepository(Inventary);
    
        const inventaryFound = await inventaryRepository.findOne({
        where: [{ id: id }, { name: name }],
        });
    
        if (!inventaryFound) return [null, "Artículo no encontrado"];
    
        const existingInventary = await inventaryRepository.findOne({
        where: [{ name: body.name }],
        });
    
        if (existingInventary && existingInventary.id !== inventaryFound.id) {
            return [null, "Ya existe un Artículo con ese nombre"];
        }
    }
    catch (error) {
        console.error("Error al actualizar el Artículo:", error);
        return [null, "Error interno del servidor"];
    }
    }

export async function createInventaryService(body) {
    try {
        const inventaryRepository = AppDataSource.getRepository(Inventary);
    
        const existingInventary = await inventaryRepository.findOne({
        where: [{ name: body.name }],
        });
    
        if (existingInventary) return [null, "Ya existe un Artículo con ese nombre"];
    
        const inventary = inventaryRepository.create(body);
    
        await inventaryRepository.save(inventary);
    
        return [inventary, null];
    } catch (error) {
        console.error("Error al crear el Artículo:", error);
        return [null, "Error interno del servidor"];
    }
    }

export async function deleteInventaryService(query) {    
    try {
        const { id, name } = query;
    
        const inventaryRepository = AppDataSource.getRepository(Inventary);
    
        const inventaryFound = await inventaryRepository.findOne({
        where: [{ id: id }, { name: name }],
        });
    
        if (!inventaryFound) return [null, "Artículo no encontrado"];
    
        await inventaryRepository.remove(inventaryFound);
    
        return [inventaryFound, null];
    } catch (error) {
        console.error("Error al eliminar el Artículo:", error);
        return [null, "Error interno del servidor"];
    }
    }
