import { useState, useEffect } from 'react';
import { getInventorys } from "@services/inventory.service.js";


const useInventory = () => {
    const [inventory, setInventory] = useState([]);

    const fetchInventory = async () => {
        try {
            const response = await getInventorys();
            const formattedData = response.map(inventory => ({
                idProducto: inventory.idProducto,
                nombre: inventory.nombre,
                precio: inventory.precio,
                stock: inventory.stock,
                createdAt: inventory.createdAt,
                updatedAt: inventory.updatedAt
            }));
            dataLogged(formattedData);
            setInventory(formattedData);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const dataLogged = (formattedData) => {
        try {
            const sessionData = sessionStorage.getItem('inventory');
            if (sessionData) {
                const { id } = JSON.parse(sessionData);
                if (id) {
                    for (let i = 0; i < formattedData.length; i++) {
                        if (formattedData[i].idProducto === id) {
                            formattedData.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error processing inventory data:", error);
        }
    };

    return { inventory, fetchInventory, setInventory };
};

export default useInventory;






