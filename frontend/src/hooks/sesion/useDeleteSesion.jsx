import { deleteSesion } from '@services/sesion.service.js'; 
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteSesion = (fetchSesiones) => {
    const handleDelete = async (dataSesion) => {
        if (dataSesion.length > 0) {
            try {
                const result = await deleteDataAlert();

                if (result.isConfirmed) {
                    const response = await deleteSesion(dataSesion[0].id_sesion);

                    if (response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }

                    showSuccessAlert('¡Eliminada!', 'La sesión ha sido eliminada correctamente.');

                    await fetchSesiones(); 
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar la sesión:', error);
                showErrorAlert('Error', 'Ocurrió un error al eliminar la sesión.');
            }
        }
    };

    return {
        handleDelete,
    };
};

export default useDeleteSesion;