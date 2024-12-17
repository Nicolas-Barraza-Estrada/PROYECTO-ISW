import axios from "./root.service.js";
import { formatOrdenData } from '@helpers/formatData.js';

export async function getOrdenes() {
    try {
        const { data } = await axios.get('/ordenes/listar');
        const formattedData = data.data.map(formatOrdenData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function addOrdenes(newItem) {
    try {
        const response = await axios.post('/ordenes/crear/', newItem);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateOrdenes(data, id) {
    try {
        const response = await axios.put(`/ordenes/actualizar/`, data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}
