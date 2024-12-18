import { deleteAsistencia } from "@services/asistencia.service.js";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";

const useDeleteAsistencia = (fetchAsistencia, setDataAsistencia) => {
    const handleDelete = async (dataAsistencia) => {
        if (dataAsistencia.length > 0) {
            try {
                const result = await deleteDataAlert();
            if (result.isConfirmed) {
                const response = await deleteAsistencia(dataAsistencia[0].idAsistencia);
                if(response.status === 'Client error') {
                    return showErrorAlert('Error', response.details);
                }
                showSuccessAlert('¡Eliminado!','La asistencia ha sido eliminada correctamente.');
                await fetchAsistencia();
                setDataAsistencia([]);
            } else {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
            }
            } catch (error) {
                console.error('Error al eliminar la asistencia:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el usuario.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteAsistencia;
