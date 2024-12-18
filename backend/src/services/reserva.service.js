"use strict";
import Reserva from '../entity/reserva.entity.js';
import { AppDataSource } from '../config/configDb.js';
import User from '../entity/user.entity.js';
import Sesion from '../entity/sesion.entity.js';

export async function createReservaService(id_sesion, rut_usuario, fono_cliente) {
  try {
      const reservaRepository = AppDataSource.getRepository(Reserva);
      const userRepository = AppDataSource.getRepository(User);
      const sesionRepository = AppDataSource.getRepository(Sesion);

      if (!fono_cliente || typeof fono_cliente !== 'string' || fono_cliente.trim() === '') {
          return [null, "El número de teléfono del cliente es obligatorio y debe ser válido."];
      }

      const user = await userRepository.findOne({ where: { rut: rut_usuario } });
      if (!user) {
          return [null, `No se encontró un usuario con el RUT: ${rut_usuario}`];
      }

      const sesion = await sesionRepository.findOne({ where: { id_sesion } });
      if (!sesion) {
          return [null, "La sesión no existe"];
      }

      if (!sesion.disponibilidad) {
          return [null, "La sesión no está disponible"];
      }

      const nuevaReserva = reservaRepository.create({
          id_sesion,
          rut_usuario: user.rut,
          nombre_cliente: user.nombreCompleto,
          email_cliente: user.email,
          fono_cliente, 
      });

      const reservaGuardada = await reservaRepository.save(nuevaReserva);

      sesion.disponibilidad = false; 
      await sesionRepository.save(sesion); 

      return [reservaGuardada, null];
  } catch (error) {
      console.error('Error al crear la reserva:', error);
      return [null, 'Error interno del servidor'];
  }
}

  export async function getReservaService(id_sesion, rut_usuario) {
    try {
      const reservaRepository = AppDataSource.getRepository(Reserva);
      const reservaFound = await reservaRepository.findOne({
        where: { id_sesion, rut_usuario },
      });
      return [reservaFound || null, null];
    } catch (error) {
      console.error("Error al obtener la reserva:", error);
      return [null, "Error interno del servidor"];
    }
  }

  export async function getReservasService() {
    try {
      const reservaRepository = AppDataSource.getRepository(Reserva);
      const reservas = await reservaRepository.find();
      return [reservas, null];
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
      return [null, "Error interno del servidor"];
    }
  }


  export async function updateReservaService(id_sesion, rut_usuario, dataReserva) {
    try {
        const reservaRepository = AppDataSource.getRepository(Reserva);
        const reservaFound = await reservaRepository.findOne({ where: { id_sesion, rut_usuario } });

        if (!reservaFound) {
            return null; 
        }

        await reservaRepository.update({ id_sesion, rut_usuario }, dataReserva);
        return await reservaRepository.findOne({ where: { id_sesion, rut_usuario } });
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
    }
}

export async function deleteReservaService(id_sesion, rut_usuario) {
    try {
      const reservaRepository = AppDataSource.getRepository(Reserva);
      const reservaFound = await reservaRepository.findOne({ where: { id_sesion, rut_usuario } });
  
      if (!reservaFound) {
        return [null, "Reserva no encontrada"]; 
      }
  
      await reservaRepository.remove(reservaFound);
      return [reservaFound, null]; 
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      return [null, "Error interno del servidor"];
    }
  }