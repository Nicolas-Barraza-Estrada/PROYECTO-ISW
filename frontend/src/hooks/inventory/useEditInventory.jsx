import { useState } from 'react';
import { updateInventory } from '@services/inventory.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatInventoryData } from '@helpers/formatData.js';

const useEditInventory = (setInventory) => {
    const [isPopupInvOpen, setIsPopupInvOpen] = useState(false);
    const [dataInventory, setDataInventory] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataInventory.length > 0) {
            setIsPopupInvOpen(true);
        }
    };

    const handleUpdate = async (updatedInventoryData) => {
        if (updatedInventoryData) {
            try {
                const updatedInventory = await updateInventory(updatedInventoryData, dataInventory[0].idProducto);
                showSuccessAlert('¡Actualizado!', 'El Inventario ha sido actualizado correctamente.');
                setIsPopupInvOpen(false);
    
                const formattedInventory = formatInventoryData(updatedInventory);
                setInventory(prevInventorys => 
                    prevInventorys.map(inventory => 
                        inventory.idProducto === formattedInventory.idProducto ? formattedInventory : inventory
                    )
                );
    
                setDataInventory([]);
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el usuario.');
            }
        }
    };
    

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupInvOpen,
        setIsPopupInvOpen,
        dataInventory,
        setDataInventory
    };
};

export default useEditInventory;