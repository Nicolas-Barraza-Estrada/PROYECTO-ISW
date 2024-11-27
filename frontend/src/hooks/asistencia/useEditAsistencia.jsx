import { useState } from 'react';
import { updateAsistencia } from '@services/asistencia.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatAsistenciaData } from '@helpers/formatData.js';

const useUpdateAsistencia = (setAsistencia) => {
  const [isPopupAsistenciaOpen, setIsPopupAsisOpen] = useState(false);
  const [dataAsistencia, setDataAsistencia] = useState([]);
  
  const handleClickUpdate = () => {
      if (dataAsistencia.length >= 0) {
          setIsPopupAsisOpen(true);
      }
  };

  const handleUpdate = async (updatedAsistenciaData) => {
      if (updatedAsistenciaData) {
          try {
                
              const updatedAsistencia = await updateAsistencia(updatedAsistenciaData, dataAsistencia[0].id_asistencia);
              showSuccessAlert('¡Actualizado!', 'La asistencia ha sido actualizado correctamente.');
              setIsPopupAsisOpen(false);
  
              const formattedAsistencia = formatAsistenciaData(updatedAsistencia);
              setAsistencia(prevAsistencia => 
                  prevAsistencia.map(Asistencia => 
                      Asistencia.id_asistencia === formattedAsistencia.id_asistencia ? formattedAsistencia : Asistencia
                  )
              );
              setDataAsistencia([]);
          } catch (error) {
              console.error('Error al actualizar la Asistencia:', error);
              showErrorAlert('Cancelado', 'Ocurrió un error al actualizar la Asistencia.');
          }
      }
  };
  

  return {
      handleClickUpdate,
      handleUpdate,
      isPopupAsistenciaOpen,
      setIsPopupAsisOpen,
      dataAsistencia,
      setDataAsistencia
  };
};

export default useUpdateAsistencia;