import { useState } from 'react';
import { addInventory } from '@services/inventory.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatInventoryData } from '@helpers/formatData.js';

const useAddInventory = (setInventory) => {
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [newItemData, setNewItemData] = useState({});

    const handleClickAdd = () => {
        setIsAddPopupOpen(true);
    };

    const handleAddItem = async (newItem) => {
        console.log("New Item Submitted:", newItem); 

        if (!newItem.nombre || !newItem.precio || !newItem.stock) {
            showErrorAlert('Error', 'Por favor, complete todos los campos.');
            return;
        }
    
        try {
            const addedItem = await addInventory(newItem); 
            const formattedItem = formatInventoryData(addedItem); 

            setInventory((prevInventory) => [...prevInventory, formattedItem]);

            showSuccessAlert('¡Producto agregado!', 'El producto se ha agregado correctamente.');
            setIsAddPopupOpen(false);
            setNewItemData({});
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
        newItemData,
        setNewItemData,
    };
};

export default useAddInventory;
