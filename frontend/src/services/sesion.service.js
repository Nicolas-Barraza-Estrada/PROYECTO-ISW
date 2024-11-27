import axios from "./root.service.js";  
import { formatSesionData } from '@helpers/formatData.js';  

// Obtener todas las sesiones
export async function getSesiones() {
    try {
        const { data } = await axios.get('/sesion/all'); 
        const formattedData = data.data.map(formatSesionData);  
        return formattedData;
    } catch (error) {
        console.error("Error al obtener las sesiones:", error);
        return error.response.data;
    }
}

export async function getSesion(id) {
    try {
        const { data } = await axios.get(`/sesion/${id}`);  
        return data.data;
    } catch (error) {
        console.error("Error al obtener la sesión:", error);
        return error.response.data;
    }
}

export async function addSesion(newSesion) {
    try {
        const response = await axios.post('/sesion', newSesion); 
        return response.data.data;
    } catch (error) {
        console.error("Error al agregar la sesión:", error);
        return error.response.data;
    }
}

export async function updateSesion(data, id) {
    try {
        const response = await axios.put(`/sesion/${id}`, data);  
        return response.data.data;
    } catch (error) {
        console.error("Error al actualizar la sesión:", error);
        return error.response.data;
    }
}

export async function deleteSesion(id) {
    try {
        const response = await axios.delete(`/sesion/${id}`); 
        return response.data.data;
    } catch (error) {
        console.error("Error al eliminar la sesión:", error);
        return error.response.data;
    }
}