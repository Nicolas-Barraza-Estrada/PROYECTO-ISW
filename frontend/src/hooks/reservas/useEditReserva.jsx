import { useState } from 'react';
import { updateReserva } from '@services/reserva.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatReservaData } from '@helpers/formatData.js';
import { getSesiones } from '@services/sesion.service';


const useEditReserva = (setReservas) => {
    const [isPopupReservaOpen, setIsPopupReservaOpen] = useState(false);
    const [dataReserva, setDataReserva] = useState([]);



    const handleClickUpdate = () => {
        if (dataReserva.length > 0) {
            setIsPopupReservaOpen(true);
        }
    };

    const handleUpdate = async (updatedReservaData) => {
        if (updatedReservaData) {
            try {
                const { rut_usuario, id_sesion,nombreSesion, ...dataToUpdate } = updatedReservaData;
                const updatedReserva = await updateReserva(dataToUpdate, dataReserva[0].id_sesion, dataReserva[0].rut_usuario,dataReserva[0].nombreSesion);
                console.log("Reservas xd", dataReserva)
                console.log("reservas", updatedReserva)

                const reservaFinal = {
                    ...updatedReserva,
                    nombreSesion: updatedReserva.nombreSesion || dataReserva[0].nombreSesion
                };

                showSuccessAlert('¡Actualizada!', 'La reserva ha sido actualizada correctamente.');
                setIsPopupReservaOpen(false);

                const formattedReserva = formatReservaData(reservaFinal);

                setReservas((prevReservas) => 
                    prevReservas.map((reserva) => 
                        reserva.id_sesion === formattedReserva.id_sesion && reserva.rut_usuario === formattedReserva.rut_usuario 
                            ? formattedReserva 
                            : reserva
                    )
                );

                setDataReserva([]);
            } catch (error) {
                console.error('Error al actualizar la reserva:', error);
                showErrorAlert('Error', 'Ocurrió un error al actualizar la reserva.');
            }
        } else {
            showErrorAlert('Error', 'No se proporcionaron datos para actualizar.');
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupReservaOpen,
        setIsPopupReservaOpen,
        dataReserva,
        setDataReserva,
    };
};

export default useEditReserva;
