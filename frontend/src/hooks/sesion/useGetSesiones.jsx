import { useState, useEffect } from "react";
import { getSesiones } from "@services/sesion.service.js";

const useGetSesion = () => {
  const [sesiones, setSesiones] = useState([]);


  const fetchSesiones = async () => {
    try {
      const response = await getSesiones();
      const formattedData = response.map(sesion => ({
        id_sesion: sesion.id_sesion,
        nombreSesion: sesion.nombreSesion,
        disponibilidad: sesion.disponibilidad,
        fecha: sesion.fecha,
        createdAt: sesion.createdAt,
        updatedAt: sesion.updatedAt,
      }));

      dataLogged(formattedData);
      setSesiones(formattedData); 
    } catch (error) {
      console.error("Error fetching sesiones:", error);
      setError("Hubo un error al obtener las sesiones");
    }
  };

  useEffect(() => {
    fetchSesiones();
  }, []);


  const dataLogged = (formattedData) => {
    try {
      const sessionData = sessionStorage.getItem("sesion");
      if (sessionData) {
        const { id } = JSON.parse(sessionData);
        if (id) {
          for (let i = 0; i < formattedData.length; i++) {
              if (formattedData[i].id_sesion === id) {
                  formattedData.splice(i, 1);
                  break;
              }
          }
      }
      }
    } catch (error) {
      console.error("Error processing session data:", error);
    }
    return formattedData;
  };


  return { sesiones, fetchSesiones, setSesiones };
};

export default useGetSesion;