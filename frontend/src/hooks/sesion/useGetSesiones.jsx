import { useState, useEffect } from "react";
import { getSesiones } from "@services/sesion.service.js";

const useGetSesion = () => {
  const [sesiones, setSesiones] = useState([]);
  const [error, setError] = useState(null);

  const fetchSesiones = async () => {
    try {
      const response = await getSesiones();

      if (!Array.isArray(response)) {
        throw new Error("La respuesta del servidor no es un array");
      }

      const formattedData = response.map(sesion => ({
        id_sesion: sesion.id_sesion,
        disponibilidad: sesion.disponibilidad,
        fecha: sesion.fecha,
        createdAt: sesion.createdAt,
        updatedAt: sesion.updatedAt,
      }));

      const processedData = dataLogged(formattedData);
      setSesiones(processedData); 
    } catch (error) {
      console.error("Error fetching sesiones:", error);
      setError("Hubo un error al obtener las sesiones");
    }
  };

  const dataLogged = (formattedData) => {
    try {
      const sessionData = sessionStorage.getItem("sesion");
      if (sessionData) {
        const { id } = JSON.parse(sessionData);
        if (id) {
          return formattedData.filter(item => item.id_sesion !== id); 
        }
      }
    } catch (error) {
      console.error("Error processing session data:", error);
    }
    return formattedData;
  };

  useEffect(() => {
    fetchSesiones();
  }, []);

  return { sesiones, fetchSesiones, setSesiones, error };
};

export default useGetSesion;