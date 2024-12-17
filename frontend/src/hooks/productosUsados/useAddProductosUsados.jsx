import { useState } from "react";
import { getProductosDisponibles, addProductUsed } from "@services/productosUsados.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";
import { formatProductoUsadoData } from "@helpers/formatData.js";

const useAddProductosUsados = (nOrden, setProductosUsados) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const [productosDisponibles, setProductosDisponibles] = useState([]); 
    const [selectedProducto, setSelectedProducto] = useState(null);

    const loadProductosDisponibles = async () => {
        try {
            const data = await getProductosDisponibles(nOrden);
            setProductosDisponibles(data.data);
            setIsPopupOpen(true); 
        } catch (error) {
            console.error("Error al obtener productos disponibles:", error);
        }
    };

   
    const handleAddProducto = async (cantidad) => {
        if (!selectedProducto) return;

        try {
            const data = await addProductUsed(nOrden, selectedProducto.idProducto, cantidad);
            if (data.status === "Client error") {
                throw new Error(data.message);
            } else {
                showSuccessAlert("¡Éxito!", "Producto agregado correctamente");
            }

            
            setProductosUsados((prevProductos) => [...prevProductos, data.data]);

            
            setIsPopupOpen(false);
            setSelectedProducto(null);
        } catch (error) {
            console.error("Error al agregar producto usado:", error);
            showErrorAlert("Error", "No se pudo agregar el producto");
        }
    };

    return {
        isPopupOpen,
        setIsPopupOpen,
        productosDisponibles,
        loadProductosDisponibles,
        selectedProducto,
        setSelectedProducto,
        handleAddProducto,
    };
};

export default useAddProductosUsados;
