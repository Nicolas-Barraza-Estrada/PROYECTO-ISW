import { useState } from "react";
import { getProductosDisponibles, addProductUsed } from "@services/productosUsados.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

const useAddProductosUsados = (nOrden, setProductosUsados) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para mostrar el popup
    const [productosDisponibles, setProductosDisponibles] = useState([]); // Productos disponibles
    const [selectedProducto, setSelectedProducto] = useState(null); // Producto seleccionado

    // Carga los productos disponibles para la orden
    const loadProductosDisponibles = async () => {
        try {
            const data = await getProductosDisponibles(nOrden);
            setProductosDisponibles(data.data);
            setIsPopupOpen(true); // Abre el popup cuando los datos están listos
        } catch (error) {
            console.error("Error al obtener productos disponibles:", error);
        }
    };

    // Maneja la creación de una nueva relación
    const handleAddProducto = async (cantidad) => {
        if (!selectedProducto) return;

        try {
            const data = await addProductUsed(nOrden, selectedProducto.idProducto, cantidad);
            showSuccessAlert("¡Éxito!", "Producto agregado correctamente");

            // Actualiza la lista de productos usados en el estado
            setProductosUsados((prevProductos) => [...prevProductos, data.data]);

            // Limpia el estado y cierra el popup
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
