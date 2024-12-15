import { startCase } from 'lodash';
import { format as formatRut } from 'rut.js';
import { format as formatTempo } from "@formkit/tempo";

export function formatUserData(user) {
    return {
        ...user,
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}

export function convertirMinusculas(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].toLowerCase();
        }
    }
    return obj;
}
export function formatOrdenData(orden) 
{   
    return {
        ...orden,
        n_orden: parseInt(orden.n_orden),
        descripcion: startCase(orden.descripcion),
        estado: startCase(orden.estado),
        costo: orden.costo
    };
    
}

export function formatProductoUsadoData(producto){
    return {
        ...producto,
        n_orden: parseInt(producto.n_orden),
        idProducto: producto.idProducto,
        nombre: startCase(producto.nombre),
        cantidad: producto.cantidad,
        stock: producto.stock
    };
}

export function formatInventoryData(inventory) {
    return {
        ...inventory,
        nombreProducto: startCase(inventory.nombreProducto),
        stock: (inventory.stock),
        precio: formatCurrency(inventory.precio), // Formatting price
        createdAt: formatTempo(inventory.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(inventory.updatedAt, "DD-MM-YYYY")
    };
}

export function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CLP', // Change this to your preferred currency code
        minimumFractionDigits: 2, // Adjust this if needed
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatPostUpdate(user) {
    return {
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        email: user.email,
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}