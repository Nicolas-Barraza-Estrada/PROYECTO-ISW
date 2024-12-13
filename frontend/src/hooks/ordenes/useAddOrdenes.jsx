import { addOrdenes } from '../../services/ordenes.service'; 
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatOrdenData } from '@helpers/formatData.js';
import { useState } from 'react';

const useAddOrdenes = (setInventory) => {
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [newItemData, setNewItemData] = useState({});
    const handleClickAdd = () => {
        setIsAddPopupOpen(true);
    };
    const handleAddItem = async (newItem) => {
        console.log("New Item Submitted:", newItem); 
        
        if (!newItem.rut_Trabajador  || !newItem.nombreCliente || !newItem.fono_cliente || !newItem.email_cliente || !newItem.descripcion || !newItem.estado) {
            showErrorAlert('Error', 'Por favor, rellene todos los campos.');
            return;
        }
    
        try {
            const addedItem = await addOrdenes(newItem); 
            const formattedItem = formatOrdenData(addedItem); 
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
export default useAddOrdenes;