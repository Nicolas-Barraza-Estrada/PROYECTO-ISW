import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
  } from "../handlers/responseHandlers.js";
import OrdenesSchema from "../entity/ordenes.entity.js";
import UserSchema from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { createOrdenesValidation } from "../validations/ordenes.validation.js";
import { updateOrdenesValidation } from "../validations/ordenes.validation.js";
import {
    createOrdenesService,
    getOrdenesService,
    getOrdenService,
    updateOrdenService,
  } from "../services/ordenes.services.js";
  
  export async function createOrdenes(req, res) {
    try {
        const ordenesR = AppDataSource.getRepository(OrdenesSchema);
        const ordenes = req.body;

        const { error } = createOrdenesValidation.validate(ordenes);

        if (error) {
            return handleErrorClient(res, 404, error.details[0].message, ordenes);
        }
        
        if (!ordenes.rut_Trabajador || !ordenes.nombreCliente 
            || !ordenes.fono_cliente || !ordenes.email_cliente || !ordenes.descripcion 
            || !ordenes.estado) {
                return handleErrorClient(res, 404, "Datos incompletos", ordenes);
        }

        const userR = AppDataSource.getRepository(UserSchema);
        const user = await userR.findOneBy({ rut: ordenes.rut_Trabajador });
        if (!user) {
            return handleErrorClient(res, 404, "El rut del trabajador no está registrado", ordenes);
        }
        
        const countOrdenes = await ordenesR.count();
        let newNOrden = countOrdenes + 1;
        while (1) {
            const ordenExist = await ordenesR.findOneBy({ n_orden: newNOrden.toString() });
            if (!ordenExist) {
                break;
            }
            newNOrden += 1;
        }
        // crea la nueva orden de trabajo
            const newOrdenes = ordenesR.create({
            rut_Trabajador: ordenes.rut_Trabajador,
            n_orden: newNOrden.toString(), // Convertir a string si `n_orden` es varchar (porque asi esta en entity)
            nombreCliente: ordenes.nombreCliente,
            fono_cliente: ordenes.fono_cliente,
            email_cliente: ordenes.email_cliente,
            descripcion: ordenes.descripcion,
            estado: ordenes.estado,
            costo: 0,
        });
        
        const ordenesSaved = await ordenesR.save(newOrdenes); 
    
        return handleSuccess(res, 200, "Orden de trabajo creada correctamente", ordenesSaved);
    } catch (error) {
        return handleErrorServer(res, 500, error.message);
    }
}


export async function getOrdenes(req, res) {
    try {
        const ordenesR = AppDataSource.getRepository(OrdenesSchema);
        const ordenes = await ordenesR.find();
        console.log(ordenes)
        if (!ordenes) {
            return handleErrorServer(res, 500, "No se pudo obtener las ordenes de trabajo");
        }

        return handleSuccess(res, 200, "Lista de ordenes", ordenes);
    } catch (error) {
        return handleErrorServer(res, 500, error.message);
    }
}

export async function getOrden(req, res) {
    try {
        const ordenesR = AppDataSource.getRepository(OrdenesSchema);
        const { n_orden } = req.body;

        const orden = await ordenesR.findOneBy({ n_orden: n_orden });

        if (!orden) {
        return handleErrorClient(res, 404, "Orden no encontrada", n_orden);
        }
        return handleSuccess(res, 200, "Orden encontrada", orden);
    } catch (error) {
        return handleErrorServer(res, 500, error.message);
    }
}

export async function updateOrden(req, res) {
    try {
        const ordenesR = AppDataSource.getRepository(OrdenesSchema);
        const ordenes = req.body;

        const { error } = updateOrdenesValidation.validate(ordenes);
        
        if (error) {
            return handleErrorClient(res, 404, error.details[0].message, ordenes);
        }
        if ( !ordenes.n_orden || !ordenes.descripcion || !ordenes.estado || !ordenes.costo) {
            return handleErrorClient(res, 404, "Datos incompletos",ordenes);
        }

        const ordenExist = await ordenesR.findOne(
            {
                where: { n_orden: ordenes.n_orden }
            }
        )
        console.log(ordenExist)
        if (!ordenExist) {
            return handleErrorClient(res, 404, "No existe la orden de trabajo",ordenes);
        }

        if(ordenes.costos < 0){
            return handleErrorClient(res, 404, "El costo no puede ser negativo",ordenes);
        }
        
        ordenExist.descripcion = ordenes.descripcion;
        ordenExist.estado = ordenes.estado;
        ordenExist.costo = ordenes.costo;

        const ordenUpdate = await ordenesR.save(ordenExist);
        return handleSuccess(res, 200, "Orden de trabajo actualizada", ordenUpdate);

    } catch (error) {
        return handleErrorServer(res, 500, error.message);
        
    }
}