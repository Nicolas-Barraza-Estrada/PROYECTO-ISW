import { useState } from "react";
import { addAsistencia } from '@services/asistencia.service.js';
import { formatAsistenciaData } from '@helpers/formatData.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useAddAsistencia = (fetchAsistencia, setAsistencia) => {
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [newAsistenciaData, setNewAsistenciaData] = useState({});

    const handleClickAdd = () => {
      setIsAddPopupOpen(true);
    };

    const handleAddItem = async (newItem) => {
      console.log("New Item Submitted:", newItem); 

      try {
          const addedItem = await addAsistencia(newItem); 
          console.log("Response data from addAsistencia:", addedItem);
          const formattedItem = formatAsistenciaData(addedItem); 
          console.log("Data formateada:", formattedItem);
          setAsistencia((prevAsistencia) => [...prevAsistencia, formattedItem]);

          showSuccessAlert('¡Asistencia agregada!');
          setIsAddPopupOpen(false);
          await fetchAsistencia();
          setNewAsistenciaData({});
      } catch (error) {
          console.error('Error adding item:', error);
          showErrorAlert('Error', 'No se pudo agregar el producto.');
      }
};

return {
  handleClickAdd,
  handleAddItem,
  isAddPopupOpen,
  setIsAddPopupOpen,
  newAsistenciaData,
  setNewAsistenciaData,
};
};

export default useAddAsistencia;


