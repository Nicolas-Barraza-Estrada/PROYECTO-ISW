"use strict";
import { AppDataSource } from '../config/configDb.js';
import { createReservaService, getReservaService, getReservasService, updateReservaService, deleteReservaService } from '../services/reserva.service.js';
import { reservaBodyValidation } from '../validations/reserva.validation.js';
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
  } from "../handlers/responseHandlers.js";

  export async function createReserva(req, res) {
    try {
      const reservaData = req.body;

      const { nombre_sesion, ...filteredData } = reservaData;

      const { value, error } = reservaBodyValidation.validate(filteredData);
      if (error) {
        return handleErrorClient(res, 400, error.details[0].message);
      }

      const { id_sesion, rut_usuario, fono_cliente } = value;
      const [reserva] = await createReservaService(id_sesion, rut_usuario, fono_cliente);
  
      handleSuccess(res, 201, "Reserva creada exitosamente", reserva);
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      handleErrorServer(res, 500, "Error interno en el servidor");
    }
  }
  export async function getReserva(req, res) {
    try {
      const { id_sesion, rut_usuario } = req.params;
      const [reservaFound, errorReserva] = await getReservaService(id_sesion, rut_usuario);
  
      if (errorReserva) {
        return handleErrorClient(res, 404, errorReserva);
      }
  
      if (!reservaFound) {
        return handleErrorClient(res, 404, "Reserva no encontrada");
      }
  
      handleSuccess(res, 200, "Reserva encontrada", reservaFound);
    } catch (error) {
      handleErrorServer(res, 500, 'Error interno al obtener la reserva');
    }
  }

  export async function getReservas(req, res) {
    try {
      const [reservas, errorReservas] = await getReservasService();
  
      if (errorReservas) {
        return handleErrorServer(res, 500, errorReservas);
      }
  
      if (!reservas || reservas.length === 0) {
        return handleErrorClient(res, 404, "No se encontraron reservas");
      }
  
      handleSuccess(res, 200, "Reservas encontradas", reservas);
    } catch (error) {
      handleErrorServer(res, 500, 'Error interno al obtener las reservas');
    }
  }

  export async function updateReserva(req, res) {
    try {
        const { id_sesion, rut_usuario } = req.params;
        const reserva = req.body;
        
        const { value, error } = reservaBodyValidation.validate(reserva);
        if (error) {
            return handleErrorClient(res, 400, error.details[0].message);
        }

        const reservaUpdated = await updateReservaService(id_sesion, rut_usuario, value);
        if (!reservaUpdated) {
            return handleErrorClient(res, 404, "Reserva no encontrada");
        }

        handleSuccess(res, 200, "Reserva actualizada correctamente", reservaUpdated);
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        handleErrorServer(res, 500, "Error interno en el servidor");
    }
}

export async function deleteReserva(req, res) {
    try {
      const { id_sesion, rut_usuario } = req.params;
      const [reservaDeleted, errorDelete] = await deleteReservaService(id_sesion, rut_usuario);
  
      if (errorDelete) {
        return handleErrorServer(res, 500, errorDelete);
      }
  
      if (!reservaDeleted) {
        return handleErrorClient(res, 404, "Reserva no encontrada");
      }
  
      handleSuccess(res, 200, "Reserva eliminada correctamente", reservaDeleted);
    } catch (error) {
      handleErrorServer(res, 500, 'Error interno al eliminar la reserva');
    }
  }