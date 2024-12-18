import { useState } from 'react';
import { addSesion } from '@services/sesion.service.js'; 
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatSesionData } from '@helpers/formatData.js';

const useAddSesion = (setSesion) => {
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [newSesionData, setNewSesionData] = useState({});

    const handleClickAdd = () => {
        setIsAddPopupOpen(true);
    };

    const handleAddSesion = async (newSesion) => {
        console.log("New Sesion Submitted:", newSesion);
    
        if (!newSesion.disponibilidad || !newSesion.fecha || !newSesion.nombreSesion) {
            showErrorAlert('Error', 'Por favor, complete todos los campos.');
            return;
        }
    
        try {
            const addedSesion = await addSesion(newSesion);

            const formattedSesion = formatSesionData(addedSesion);
    
            setSesion((prevSesions) => [...prevSesions, formattedSesion]);
    
            showSuccessAlert('¡Sesión agregada!', 'La sesión se ha agregado correctamente.');
            setIsAddPopupOpen(false);
            setNewSesionData([]);
        } catch (error) {
            console.error('Error al agregar la sesión:', error);
            showErrorAlert('Error', 'No se pudo agregar la sesión.');
        }
    };

    return {
        handleClickAdd,
        handleAddSesion,
        isAddPopupOpen,
        setIsAddPopupOpen,
        newSesionData,
        setNewSesionData,
    };
};

export default useAddSesion;
