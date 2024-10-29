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
        
        console.log(ordenes)
        // Validar que los campos requeridos no estén vacíos 
        if (!ordenes.rut_Trabajador || !ordenes.n_orden || !ordenes.nombreCliente 
            || !ordenes.fono_cliente || !ordenes.email_cliente || !ordenes.descripcion 
            || !ordenes.estado) {
                return res.status(400).json({
                    message: "Datos incompletos"
                  });
        }
        
        // Valida que el rut_Trabajor este registrado en en esquema de la base de datos (user)
        const userR = AppDataSource.getRepository(UserSchema);
        const user = await userR.findOneBy({ rut: ordenes.rut_Trabajor });
        if (!user) {
        console.log("El rut del trabajador no está registrado");
        handleErrorServer(res, 500, "El rut del trabajador no está registrado",
             "El rut del trabajador no está registrado")};
        
        // n° orden es unico
        const ordenesExiste = await ordenesR.findOneBy({ n_orden: ordenes.n_orden });
        if (ordenesExiste) {
            console.log("El nuemro de orden ya está registrado");
            handleErrorServer(res, 500, "El nuemro de orden ya está registrado",
             "El nuemro de orden ya está registrado")
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
            // Incluye cualquier otro campo necesario
        });
        
        const ordenesSaved = await ordenesR.save(newOrdenes); 
    
        return res.status(201).json({
        message: "Producto creado",
        data : ordenesSaved
        });
    } catch (error) {
        return res.status(500).json({
        message: "Error al crear el producto",
        error: error.message
        });
    }
    }

export async function getOrdenes(req, res) {
    try {
        const ordenesR = AppDataSource.getRepository(OrdenesSchema);
        const ordenes = await ordenesR.find();
        console.log(ordenes)
        if (!ordenes) {
        return res.status(404).json({
            message: "No hay ordenes",
            data: []
        });
        }
        
        return res.status(200).json({
        message: "Lista de ordenes",
        data: ordenes
        });
    } catch (error) {
        return res.status(500).json({
        message: "Error al obtener las ordenes",
        error: error.message
        });
    }
}

// obetener una orden de trabajo por su n_orden
export async function getOrden(req, res) {
    try {
        const ordenesR = AppDataSource.getRepository(OrdenesSchema);
        const { n_orden } = req.body;

        const orden = await ordenesR.findOneBy({ n_orden: n_orden });

        if (!orden) {
        handleErrorClient(res, 404, "Orden no encontrada", "Orden no encontrada");
        }
        return handleSuccess(res, 200, "Orden encontrada", orden);
    } catch (error) {
        return handleErrorServer(res, 500, "Error al obtener la orden", error.message);
    }
}

// update segun el n_orden 
export async function updateOrden(req, res) {
    try {
        const ordenesR = AppDataSource.getRepository(OrdenesSchema);
        const ordenes = req.body;
        
        //validar que todos los campos existan
        if ( !ordenes.n_orden || !ordenes.descripcion || !ordenes.estado || !ordenes.costo) {
        handleErrorServer(res, 500, "Faltan campos requeridos", "Faltan campos requeridos");
        }

        const ordenExist = await ordenesR.findOne(
            {
                where: { n_orden: ordenes.n_orden }
            }
        )
        console.log(ordenExist)
        if (ordenExist === null) {
            return res.status(404).json({
                message: "No se encontro la orden"
            });
        }
        
        ordenExist.descripcion = ordenes.descripcion;
        ordenExist.estado = ordenes.estado;
        ordenExist.costo = ordenes.costo;

        const ordenUpdate = await ordenesR.save(ordenExist);
        return res.status(200).json({
            message: "Producto actualizado",
            data: ordenUpdate
          });

    } catch (error) {
        return handleErrorServer(res, 500, "Error al actualizar la orden", error.message);
    }
}