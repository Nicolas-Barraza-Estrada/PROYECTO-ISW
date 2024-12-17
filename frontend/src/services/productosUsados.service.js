import axios from "./root.service.js";
import { formatProductoUsadoData } from '@helpers/formatData.js';

export async function getProductsUsed(n_orden) {
    try {
        const { data } = await axios.get(`/productosUsados/listar/${n_orden}`);
        return data; 
    } catch (error) {
        return error.response.data;
    }
}

export async function addProductUsed(nOrden, idProducto, cantidad) {
    try {
        const newProductData = { n_orden: nOrden, idProducto, cantidad };
        const { data } = await axios.post('/productosUsados/crear', newProductData);
        return data; 
    } catch (error) {
        return error.response.data;
    }
}



export async function updateProductUsed(data,id) {
    try {
        const formattedData = {
            n_orden: data.n_orden,
            idProducto: id,
            cantidad: Number(data.cantidad),
        };
        
        const response = await axios.put('/productosUsados/actualizar', formattedData);
        //console.log("Data enviada al backend:", formattedData);
        return response.data.data;
    } catch (error) {
        console.error("Error al actualizar el producto usado:", error);
        return error.response?.data || error.message;
    }
}

export async function getProductosDisponibles(n_orden) {
    try {
        const { data } = await axios.get(`/productosUsados/disponibles/${n_orden}`);
        return data; 
    } catch (error) {
        return error.response.data;
    }
}
