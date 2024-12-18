import { useState } from 'react';
import { addReserva } from '@services/reserva.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatReservaData } from '@helpers/formatData.js';

const useAddReserva = (setReservas) => {
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [newReservaData, setNewReservaData] = useState({});

    const handleClickAdd = () => {
        setIsAddPopupOpen(true);
    };

    const handleAddReserva = async (newReserva) => {
        console.log("Nueva reserva enviada:", newReserva);
    
        if (!newReserva.id_sesion || !newReserva.rut_usuario || !newReserva.nombre_cliente || !newReserva.email_cliente) {
            showErrorAlert('Error', 'Por favor, complete todos los campos obligatorios.');
            return;
        }
    
        try {
            const { nombreSesion, ...reservaData } = newReserva;

            const addedReserva = await addReserva(reservaData);
    
            const reservaCompleta = {
                ...addedReserva,
                nombreSesion: newReserva.nombreSesion 
            };
    
            const formattedReserva = formatReservaData(reservaCompleta);
    
            setReservas((prevReservas) => [...prevReservas, formattedReserva]);
    
            showSuccessAlert('¡Reserva agregada!', 'La reserva se ha agregado correctamente.');
            setIsAddPopupOpen(false);
            setNewReservaData([]); 
        } catch (error) {
            console.error('Error al agregar la reserva:', error);
            showErrorAlert('Error', 'No se pudo agregar la reserva.');
        }
    };

    return {
        handleClickAdd,
        handleAddReserva,
        isAddPopupOpen,
        setIsAddPopupOpen,
        newReservaData,
        setNewReservaData,
    };
};

export default useAddReserva;
