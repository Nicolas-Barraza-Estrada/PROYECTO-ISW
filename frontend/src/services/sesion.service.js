import axios from "./root.service.js";  
import { formatSesionData } from '@helpers/formatData.js';  

export async function getSesiones() {
    try {
        const { data } = await axios.get('/sesion/all'); 
        const formattedData = data.data.map(formatSesionData);  
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getSesion(id) {
    try {
        const { data } = await axios.get(`/sesion/${id}`);  
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export const addSesion = async (newSesion) => {
    try {
        const response = await axios.post('/sesion', newSesion);

        if (response.status >= 200 && response.status < 300) {
            return response.data.data;
        } else {
            throw new Error('Error al agregar la sesión: ' + response.statusText);
        }
    } catch (error) {
        throw error;
    }
};
export async function updateSesion(data, id) {
    try {
        const response = await axios.put(`/sesion/${id}`, data);

        if (response.status >= 200 && response.status < 300) {
            console.log(response)
            return response.data.data;
        } else {
            throw new Error('Error al actualizar la sesión: ' + response.statusText);
        }
    } catch (error) {
        if (error.response) {
            throw new Error(
                `Error ${error.response.status}: ${error.response.data?.message || 'Error desconocido'}`
            );
        } else {
            throw new Error(error.message || 'Error desconocido');
        }
    }
}

export async function deleteSesion(id) {
    try {
        const response = await axios.delete(`/sesion/${id}`); 
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}