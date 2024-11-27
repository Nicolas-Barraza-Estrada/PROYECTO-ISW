import axios from "./root.service.js";
import { formatAsistenciaData } from "@helpers/formatData.js";


// Obtener asistencias
export async function getAsistencias() {
  try {
    const { data } = await axios.get("/asistencia");
    
    const formattedData = data.map(formatAsistenciaData);
    console.log("Data from getAsistencias:", formattedData);
    return formattedData;
  } catch (error) {
    return error.response?.data || { error: "Error fetching asistencias" };
  }
}

// Agregar una nueva asistencia
export async function addAsistencia(newAsistencia) {
  try {
    const response = await axios.post("/asistencia", newAsistencia);
    console.log("Response from addAsistencia:", newAsistencia);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Error adding asistencia" };
  }
}

// Actualizar una asistencia existente
export async function updateAsistencia(updatedAsistencia, id) {
  if (!id) {
    throw new Error("ID de la asistencia no proporcionado.");
  }

  try {
    const response = await axios.put(`/asistencia/${id}`, updatedAsistencia);
    console.log("Response from updateAsistencia:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error in updateAsistencia:", error);
    return error.response?.data || { error: "Error updating asistencia" };
  }
}