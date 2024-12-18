import { useState } from 'react';
import { updateSesion } from '@services/sesion.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateSesion } from '@helpers/formatData.js';

const useEditSesion = (setSesiones) => {
    const [isPopupSesionOpen, setIsPopupSesionOpen] = useState(false);
    const [dataSesion, setDataSesion] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataSesion.length > 0) {
            setIsPopupSesionOpen(true);
        }
    };

    const handleUpdate = async (updatedSesionData) => {
        if (updatedSesionData) {
            try {
                const updatedSesion = await updateSesion(updatedSesionData, dataSesion[0].id_sesion);
                showSuccessAlert('¡Actualizado!', 'La sesión ha sido actualizada correctamente.');
                setIsPopupSesionOpen(false);
                const formattedSesion = formatPostUpdateSesion(updatedSesion);

                setSesiones(prevSesiones => 
                    prevSesiones.map(sesion => 
                        sesion.id_sesion === formattedSesion.id_sesion ? formattedSesion : sesion
                    )
                );
                

                setDataSesion([]);

            } catch (error) {
                console.error('Error al actualizar la sesión:', error);
            }
        } else {
            showErrorAlert('Error', 'No se proporcionaron datos para actualizar.');
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupSesionOpen,
        setIsPopupSesionOpen,
        dataSesion,
        setDataSesion,
    };
};

export default useEditSesion;