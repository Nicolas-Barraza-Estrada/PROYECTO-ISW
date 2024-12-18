import { useState } from "react";
import { updateOrdenes } from "@services/ordenes.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatOrdenData } from "@helpers/formatData.js";

const useEditOrdenes = (setOrdenes) => {
    const [isPopupOrdOpen, setIsPopupOrdOpen] = useState(false); 
    const [dataOrden, setDataOrden] = useState([]); 

    
    const handleClickUpdate = () => {
        if (dataOrden.length > 0) {
            setIsPopupOrdOpen(true);
        }
    };

    
    const handleUpdate = async (updatedOrdenData) => {
        if (updatedOrdenData) {
            try {
                const updatedOrden = await updateOrdenes(
                    updatedOrdenData,
                    dataOrden[0].idOrden
                ); 
                showSuccessAlert(
                    "¡Actualizado!",
                    "La orden ha sido actualizada correctamente."
                );
                setIsPopupOrdOpen(false); 

                
                console.log("updatedOrdenData:", updatedOrdenData);
                const formattedOrden = formatOrdenData(updatedOrden);
                console.log("Orden actualizada:", formattedOrden);

                
                setOrdenes((prevOrdenes) =>
                    prevOrdenes.map((orden) =>
                        orden.n_orden === formattedOrden.n_orden
                            ? formattedOrden
                            : orden
                    )
                );

                setDataOrden([]); 
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
