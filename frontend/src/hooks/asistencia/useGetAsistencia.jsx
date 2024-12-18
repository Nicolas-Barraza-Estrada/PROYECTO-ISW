import { useState, useEffect } from "react";
import { getAsistencias } from "@services/asistencia.service.js"; // Asegúrate de que este servicio exista

const useGetAsistencia = () => {
    const [asistencia, setAsistencia] = useState([]);

    // Función para obtener y formatear las asistencias
    const fetchAsistencia = async () => {
        try {
            const response = await getAsistencias(); // Llama al servicio
            console.log("Response from getAsistencias:", response);
            const formattedData = response.map((item) => ({
                idAsistencia: item.idAsistencia,
                idUsuario: item.idUsuario,
                fecha: item.fecha,
                horaEntrada: item.hora_entrada,
                horaSalida: item.hora_salida,
            }));
            dataLogged(formattedData);
            setAsistencia(formattedData);
        } catch (error) {
            console.error("Error fetching asistencia:", error);
        }
    };

    // Efecto para cargar las asistencias al montar el componente
    useEffect(() => {
        fetchAsistencia();
    }, []);

    // Función para manejar datos según una sesión almacenada, si es necesario
    const dataLogged = (formattedData) => {
        try {
            const sessionData = sessionStorage.getItem("asistencia");
            if (sessionData) {
                const { id } = JSON.parse(sessionData);
                if (id) {
                    for (let i = 0; i < formattedData.length; i++) {
                        if (formattedData[i].idAsistencia === id) {
                            formattedData.splice(i, 1); // Elimina el elemento si coincide con la sesión
                            break;
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error processing asistencia data:", error);
        }
    };

    return { asistencia, fetchAsistencia, setAsistencia };
};

export default useGetAsistencia;
