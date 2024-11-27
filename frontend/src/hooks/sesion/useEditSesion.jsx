import { useState } from 'react';
import { updateSesion } from '@services/sesion.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js'; 
import { formatSesionData } from '@helpers/formatData.js'; 

const useEditSesion = (setSesiones) => {
    const [isPopupSesionOpen, setIsPopupSesionOpen] = useState(false);
    const [dataSesion, setDataSesion] = useState([]); 
    
    const handleClickUpdate = () => {
        if (dataSesion.length > 0) {
            setIsPopupSesionOpen(true); 
        } else {
            showErrorAlert('Advertencia', 'Debes seleccionar una sesión para editar.'); 
        }
    };

    const handleUpdate = async (updatedSesionData) => {
      if (!updatedSesionData) {
          showErrorAlert('Error', 'No se proporcionaron datos para actualizar.');
          return;
      }
  
      try {
          const updatedSesion = await updateSesion(updatedSesionData, dataSesion[0].id_sesion);
          showSuccessAlert('¡Actualizado!', 'La sesión ha sido actualizada correctamente.');
          setIsPopupSesionOpen(false);
  
          try {
              const formattedSesion = formatSesionData(updatedSesion);
              setSesiones((prevSesiones) =>
                  prevSesiones.map((sesion) =>
                      sesion.id_sesion === formattedSesion.id_sesion ? formattedSesion : sesion
                  )
              );
          } catch (formatError) {
              console.error('Error al formatear la sesión:', formatError);
              showErrorAlert('Error', 'Hubo un problema al actualizar la vista.');
          }
  
          setDataSesion([]);
      } catch (error) {
          console.error('Error al actualizar la sesión:', error);
          showErrorAlert('Error', 'No se pudo actualizar la sesión.');
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