import { useState, useEffect } from 'react';
import { getOrdenes } from '../../services/ordenes.service'; 
/* 
*rut_Trabajor /(FK)
n° orden
nombreCliente
fono_cliente
email_cliente
descripcion
estado
costo
*/

const useOrdenes = () => {
    
    const [ordenes, setOrdenes] = useState([]);
    const fetchOrdenes = async () => {
        try{
            console.log("Fetching orders...");
            const response = await getOrdenes();
            const formattedData = response.map(ordenes => ({    
                rut_Trabajador: ordenes.rut_Trabajador,
                //pasar n_orden de string a number
                n_orden: parseInt(ordenes.n_orden),
                nombreCliente: ordenes.nombreCliente,
                fono_cliente: ordenes.fono_cliente,
                email_cliente: ordenes.email_cliente,
                descripcion: ordenes.descripcion,
                estado: ordenes.estado,
                costo: ordenes.costo
            }));
            dataLogged(formattedData);
            setOrdenes(formattedData);
        }
        catch(error){
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrdenes();
    }, []);
    
    const dataLogged = (formattedData) => {
        try {
            const sessionData = sessionStorage.getItem('ordenes');
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
            console.error("Error processing orders data:", error);
        }
    };
    return { ordenes,fetchOrdenes, setOrdenes };
};
export default useOrdenes;