"use strict";
import Reserva from '../entity/reserva.entity.js';
import { AppDataSource } from '../config/configDb.js';
import User from '../entity/user.entity.js';
import Sesion from '../entity/sesion.entity.js';

export async function createReservaService(id_sesion, rut_usuario) {
    try {
      const reservaRepository = AppDataSource.getRepository(Reserva);
      const userRepository = AppDataSource.getRepository(User);
      const sesionRepository = AppDataSource.getRepository(Sesion);
  
      // Buscar al usuario por su RUT
      const user = await userRepository.findOne({ where: { rut: rut_usuario } });
      if (!user) {
        return [null, `No se encontró un usuario con el RUT: ${rut_usuario}`];
      }
  
      // Verificar si la sesión existe
      const sesion = await sesionRepository.findOne({ where: { id_sesion } });
      if (!sesion) {
        return [null, "La sesión no existe"];
      }
  
      // Verificar la disponibilidad de la sesión
      if (!sesion.disponibilidad) {
        return [null, "La sesión no está disponible"];
      }
  
      // Crear una nueva reserva con los datos del usuario encontrados
      const nuevaReserva = reservaRepository.create({
        id_sesion,
        rut_usuario: user.rut,
        nombre_cliente: user.nombreCompleto,
        email_cliente: user.email,
        fono_cliente: '', // Se deja vacío si es opcional
      });
  
      // Guardar la reserva en la base de datos
      const reservaGuardada = await reservaRepository.save(nuevaReserva);
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
            return null; // Reserva no encontrada
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
        return [null, "Reserva no encontrada"]; // Reserva no encontrada
      }
  
      await reservaRepository.remove(reservaFound);
      return [reservaFound, null]; // Devuelve la reserva eliminada
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      return [null, "Error interno del servidor"];
    }
  }