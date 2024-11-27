import axios from "./root.service.js";
import { formatOrdenData } from '@helpers/formatData.js';

// Obtener todas las órdenes
export async function getOrdenes() {
    try {
        const { data } = await axios.get('/ordenes/listar');
        const formattedData = data.data.map(formatOrdenData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

// Crear nueva orden
export async function addOrdenes(newItem) {
    try {
        const response = await axios.post('/ordenes/crear', newItem);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

// Actualizar orden existente
export async function updateOrdenes(data, id) {
    try {
        const response = await axios.put(`/ordenes/actualizar/?id=${id}`, data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

// ----------------------------------------
// Funciones para productos usados
// ----------------------------------------

// Obtener productos usados por número de orden
export async function getProductsUsed(nOrden) {
    try {
        const { data } = await axios.get(`/productosUsados/listar/${nOrden}`);
        return data; // Asumimos que 'data' contiene la lista de productos
    } catch (error) {
        return error.response.data;
    }
}

// Agregar productos usados a una orden
export async function addProductUsed(nOrden, idProducto, cantidad) {
    try {
        const newProductData = { n_orden: nOrden, idProducto, cantidad };
        const { data } = await axios.post('/productosUsados/crear', newProductData);
        return data; // Asumimos que el backend devuelve el producto agregado
    } catch (error) {
        return error.response.data;
    }
}

// Actualizar cantidad de productos usados en una orden
export async function updateProductUsed(nOrden, idProducto, cantidad) {
    try {
        const updateData = { n_orden: nOrden, idProducto, cantidad };
        const { data } = await axios.put('/productosUsados/actualizar', updateData);
        return data; // Asumimos que el backend devuelve el producto actualizado
    } catch (error) {
        return error.response.data;
    }
}
