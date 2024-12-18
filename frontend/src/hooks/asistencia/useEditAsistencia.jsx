import { useState } from 'react';
import { updateAsistencia } from '@services/asistencia.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatAsistenciaData } from '@helpers/formatData.js';

const useUpdateAsistencia = (fetchAsistencia,setAsistencia) => {
    const [isPopupAsistenciaOpen, setIsPopupAsisOpen] = useState(false);
    const [dataAsistencia, setDataAsistencia] = useState([]);

    const handleClickUpdate = () => {
        if (dataAsistencia.length > 0) {
            setIsPopupAsisOpen(true);
        }
    };

  const handleUpdate = async (updatedAsistenciaData) => {
    if (updatedAsistenciaData) {
        try {
        console.log("Datos actualizados recibidos:", updatedAsistenciaData);
        const updatedAsistencia = await updateAsistencia(updatedAsistenciaData, dataAsistencia[0].idAsistencia);
        showSuccessAlert('¡Actualizado!','La asistencia ha sido actualizada correctamente.');
        setIsPopupAsisOpen(false);
        const formattedAsistencia = formatAsistenciaData(updatedAsistencia);

        setAsistencia(prevAsistencia => prevAsistencia.map(asistencia => {
            console.log("Asistencia actual:", asistencia);
            if (asistencia.idAsistencia === formattedAsistencia.idAsistencia) {
                console.log("Reemplazando con:", formattedAsistencia);
            }
            return asistencia.idAsistencia === formattedAsistencia.idAsistencia ? formattedAsistencia : asistencia;
            
        }));
        setDataAsistencia([]);
        fetchAsistencia();
        } catch (error) {
            console.error('Error al actualizar la asistencia:', error);
            showErrorAlert('Cancelado','Ocurrió un error al actualizar la asistencia.');
        }

  };
};

  return {
    handleClickUpdate,
    handleUpdate,
    isPopupAsistenciaOpen,
    setIsPopupAsisOpen,
    dataAsistencia,
    setDataAsistencia,
  };
};

export default useUpdateAsistencia;
