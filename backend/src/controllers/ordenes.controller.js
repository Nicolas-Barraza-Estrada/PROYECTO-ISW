import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
  } from "../handlers/responseHandlers.js";
import OrdenesSchema from "../entity/ordenes.entity.js";
import UserSchema from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createOrdenes(req, res) {
    try {
        const ordenesR = AppDataSource.getRepository(OrdenesSchema);
        const ordenes = req.body;
        
        // Validar que los campos requeridos no estén vacíos 
        if (!ordenes.rut_Trabajador || !ordenes.n_orden || !ordenes.nombreCliente 
            || !ordenes.fono_cliente || !ordenes.email_cliente || !ordenes.descripcion 
            || !ordenes.estado) {
                return handleErrorClient(res, 404, "Datos incompletos",ordenes);
        }
        console.log(ordenes.rut_Trabajador)

        // Valida que el rut_Trabajor este registrado en en esquema de la base de datos (user)
        const userR = AppDataSource.getRepository(UserSchema);
        const user = await userR.findOneBy({ rut: ordenes.rut_Trabajador });
        if (!user) {
        console.log("El rut del trabajador no está registrado");
        return handleErrorServer(res, 500, "El rut del trabajador no está registrado")};
        
        // n° orden es unico
        const ordenesExiste = await ordenesR.findOneBy({ n_orden: ordenes.n_orden });
        if (ordenesExiste) {
            console.log("El numero de orden ya está registrado");
            return handleErrorServer(res, 500, "El numero de orden ya está registrado")
        };
        
        const newOrdenes = ordenesR.create({
            rut_Trabajador: ordenes.rut_Trabajador,
            n_orden: ordenes.n_orden,
            nombreCliente: ordenes.nombreCliente,
            fono_cliente: ordenes.fono_cliente,
            email_cliente: ordenes.email_cliente,
            descripcion: ordenes.descripcion,
            estado: ordenes.estado,
            costo: ordenes.costo,
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
            return handleErrorServer(res, 500, "NO existen ordenes de trabajo");
        }

        return handleSuccess(res, 200, "Lista de ordenes", ordenes);
    } catch (error) {
        return handleErrorServer(res, 500, error.message);
    }
}

// obetener una orden de trabajo por su n_orden
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

// update segun el n_orden 
export async function updateOrden(req, res) {
    try {
        const ordenesR = AppDataSource.getRepository(OrdenesSchema);
        const ordenes = req.body;
        
        //validar que todos los campos existan
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
            return handleErrorServer(res, 500, "No existe la orden de trabajo");
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