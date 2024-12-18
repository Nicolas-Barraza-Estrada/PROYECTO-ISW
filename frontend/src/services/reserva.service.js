import axios from "./root.service.js";
import { formatReservaData } from "@helpers/formatData.js";


export async function getReservas() {
    try {
        const { data } = await axios.get('/reserva/all');
        const formattedData = data.data.map(formatReservaData)
        return formattedData; 
    } catch (error) {
        return error.response.data ;
    }
}

export async function getReserva(id_sesion, rut_usuario) {
    try {
        const { data } = await axios.get(`/reserva/${id_sesion}/${rut_usuario}`);
        return data.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener la reserva' };
    }
}

export const addReserva = async (newReserva) => {
    try {
        const response = await axios.post('/reserva', newReserva);

        if (response.status >= 200 && response.status < 300) {
            return response.data.data;
        } else {
            throw new Error('Error al agregar la reserva: ' + response.statusText);
        }
    } catch (error) {
        throw new Error(
            error.response?.data?.message || error.message || 'Error desconocido'
        );
    }
};

export async function updateReserva(data, id_sesion, rut_usuario) {
    try {
        const response = await axios.put(`/reserva/${id_sesion}/${rut_usuario}`, data);

        if (response.status >= 200 && response.status < 300) {
            return response.data.data;
        } else {
            throw new Error('Error al actualizar la reserva: ' + response.statusText);
        }
    } catch (error) {
        throw new Error(
            error.response?.data?.message || error.message || 'Error desconocido'
        );
    }
}

export async function deleteReserva(id_sesion, rut_usuario) {
    try {
        const response = await axios.delete(`/reserva/${id_sesion}/${rut_usuario}`);
        return response.data.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al eliminar la reserva' };
    }
}
