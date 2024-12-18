import { deleteReserva } from '@services/reserva.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteReserva = (fetchReservas) => {
    const handleDelete = async (dataReserva) => {
        if (dataReserva.length > 0) {
            try {
                const result = await deleteDataAlert();

                if (result.isConfirmed) {
                    const response = await deleteReserva(dataReserva[0].id_sesion, dataReserva[0].rut_usuario);

                    if (response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }

                    showSuccessAlert('¡Eliminada!', 'La reserva ha sido eliminada correctamente.');

                    await fetchReservas(); 
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar la reserva:', error);
                showErrorAlert('Error', 'Ocurrió un error al eliminar la reserva.');
            }
        }
    };

    return {
        handleDelete,
    };
};

export default useDeleteReserva;
