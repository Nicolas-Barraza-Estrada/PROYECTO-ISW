import { useState, useEffect } from 'react';
import { getReservas } from '@services/reserva.service';
import { getSesiones } from '@services/sesion.service'; 

const useGetReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [sesiones, setSesiones] = useState([]); 

    const fetchSesiones = async () => {
        try {
            const response = await getSesiones(); 
            setSesiones(response); 
        } catch (error) {
            console.error("Error al obtener las sesiones: ", error);
        }
    };

    const fetchReservas = async () => {
        try {
            const response = await getReservas(); 
            const formattedData = response.map(reserva => {
                const sesion = sesiones.find(sesion => sesion.id_sesion === reserva.id_sesion);


                return {
                    id_sesion: reserva.id_sesion,
                    rut_usuario: reserva.rut_usuario,
                    nombre_cliente: reserva.nombre_cliente,
                    fono_cliente: reserva.fono_cliente,
                    email_cliente: reserva.email_cliente,
                    nombreSesion: sesion.nombreSesion, 
                };
            });

            dataLogged(formattedData);
            setReservas(formattedData); 
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchSesiones(); 
    }, []); 

    useEffect(() => {
        if (sesiones.length > 0) {
            fetchReservas(); 
        }
    }, [sesiones]); 

    const dataLogged = (formattedData) => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem('usuario'));
            for (let i = 0; i < formattedData.length; i++) {
                if (formattedData[i].rut_usuario === rut) {
                    formattedData.splice(i, 1); 
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return { reservas, fetchReservas, setReservas };
};

export default useGetReservas;