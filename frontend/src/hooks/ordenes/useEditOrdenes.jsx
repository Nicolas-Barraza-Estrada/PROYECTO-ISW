import { useState } from "react";
import { updateOrdenes } from "@services/ordenes.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatOrdenData } from "@helpers/formatData.js";

const useEditOrdenes = (setOrdenes) => {
    const [isPopupOrdOpen, setIsPopupOrdOpen] = useState(false); // Estado para mostrar el popup
    const [dataOrden, setDataOrden] = useState([]); // Datos de la orden seleccionada

    // Maneja el evento de clic en el botón de editar
    const handleClickUpdate = () => {
        if (dataOrden.length > 0) {
            setIsPopupOrdOpen(true); // Muestra el popup
        }
    };

    // Maneja la actualización de la orden
    const handleUpdate = async (updatedOrdenData) => {
        if (updatedOrdenData) {
            try {
                const updatedOrden = await updateOrdenes(
                    updatedOrdenData,
                    dataOrden[0].idOrden
                ); // Actualiza la orden en el backend
                showSuccessAlert(
                    "¡Actualizado!",
                    "La orden ha sido actualizada correctamente."
                );
                setIsPopupOrdOpen(false); // Cierra el popup

                // Formatea los datos actualizados
                const formattedOrden = formatOrdenData(updatedOrden);

                // Actualiza el estado de las órdenes en la lista
                setOrdenes((prevOrdenes) =>
                    prevOrdenes.map((orden) =>
                        orden.n_orden === formattedOrden.n_orden
                            ? formattedOrden
                            : orden
                    )
                );

                setDataOrden([]); // Limpia los datos seleccionados
            } catch (error) {
                console.error("Error al actualizar la orden:", error);
                showErrorAlert(
                    "Cancelado",
                    "Ocurrió un error al actualizar la orden."
                );
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOrdOpen,
        setIsPopupOrdOpen,
        dataOrden,
        setDataOrden,
    };
};

export default useEditOrdenes;
