import { useState, useEffect } from 'react';
import { getProductsUsed } from '../../services/productosUsados.service';

/*
* n_orden
* idProducto
* nombre
* cantidad
*/

const useProductosUsados = (n_orden) => {
    const [productosUsados, setProductosUsados] = useState([]);
    const [error, setError] = useState(null);

    const fetchProductosUsados = async () => {
        try {
            console.log("Fetching productos usados for n_orden:", n_orden);
            const response = await getProductsUsed(n_orden); // Llama al servicio
            console.log("Raw response:", response); // Inspecciona la respuesta completa
            
            // Accede a la lista dentro de response.data
            const formattedData = response.data.map((producto) => ({
                n_orden: parseInt(producto.n_orden),
                idProducto: producto.idProducto,
                nombre: producto.nombre,
                cantidad: producto.cantidad,
                stock: producto.stock,
            }));

            //console.log("Productos usados:", formattedData); // Verifica los datos formateados
            setProductosUsados(formattedData);
        } catch (err) {
            console.error("Error fetching productos usados:", err.response || err.message || err);
            setError(err.message || 'Error al obtener productos usados');
        }
    };

    useEffect(() => {
        if (n_orden) {
            fetchProductosUsados();
        }
    }, [n_orden]);

    return { productosUsados, setProductosUsados, error };
};

export default useProductosUsados;