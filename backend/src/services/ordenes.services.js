"use strict";
import OrdenesSchema from "../entity/ordenes.entity.js";
import UserSchema from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { createOrdenesValidation, updateOrdenesValidation } from "../validations/ordenes.validation.js";

export async function createOrdenesService(ordenes) {
  try {
    const ordenesRepository = AppDataSource.getRepository(OrdenesSchema);
    const userRepository = AppDataSource.getRepository(UserSchema);

    const { error } = createOrdenesValidation.validate(ordenes);
    if (error) return [null, error.details[0].message];

    // Validar campos requeridos
    if (
      !ordenes.rut_Trabajador 
      || !ordenes.n_orden 
      || !ordenes.nombreCliente 
      || !ordenes.fono_cliente 
      || !ordenes.email_cliente 
      || !ordenes.descripcion 
      || !ordenes.estado
    ) {
      return [null, "Datos incompletos"];
    }

    // Validar si el rut del trabajador está registrado
    const user = await userRepository.findOneBy({ rut: ordenes.rut_Trabajador });
    if (!user) return [null, "El rut del trabajador no está registrado"];

    // Validar si el número de orden ya existe
    const ordenExistente = await ordenesRepository.findOneBy({ n_orden: ordenes.n_orden });
    if (ordenExistente) return [null, "El número de orden ya está registrado"];

    const newOrden = ordenesRepository.create(ordenes);
    const savedOrden = await ordenesRepository.save(newOrden);

    return [savedOrden, null];
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getOrdenesService() {
  try {
    const ordenesRepository = AppDataSource.getRepository(OrdenesSchema);
    const ordenes = await ordenesRepository.find();

    if (!ordenes) return [null, "No se pudieron obtener las órdenes de trabajo"];

    return [ordenes, null];
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getOrdenService(n_orden) {
  try {
    const ordenesRepository = AppDataSource.getRepository(OrdenesSchema);

    const orden = await ordenesRepository.findOneBy({ n_orden });
    if (!orden) return [null, "Orden no encontrada"];

    return [orden, null];
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateOrdenService(ordenes) {
  try {
    const ordenesRepository = AppDataSource.getRepository(OrdenesSchema);

    const { error } = updateOrdenesValidation.validate(ordenes);
    if (error) return [null, error.details[0].message];

    // Validar campos requeridos
    if (!ordenes.n_orden || !ordenes.descripcion || !ordenes.estado || !ordenes.costo) {
      return [null, "Datos incompletos"];
    }

    const ordenExist = await ordenesRepository.findOneBy({ n_orden: ordenes.n_orden });
    if (!ordenExist) return [null, "No existe la orden de trabajo"];

    ordenExist.descripcion = ordenes.descripcion;
    ordenExist.estado = ordenes.estado;
    ordenExist.costo = ordenes.costo;

    const updatedOrden = await ordenesRepository.save(ordenExist);

    return [updatedOrden, null];
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    return [null, "Error interno del servidor"];
  }
}
