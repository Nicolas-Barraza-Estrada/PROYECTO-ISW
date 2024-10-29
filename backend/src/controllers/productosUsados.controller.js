//inventary.controller.js , solo controlador, sin valdaciones ni services
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
  } from "../handlers/responseHandlers.js";
  import ProductosUsadosSchema from "../entity/ProductosUsados.entity.js";
  import InventarySchema from "../entity/inventary.entity.js";
  import OrdenesSchema from "../entity/ordenes.entity.js";
  import { AppDataSource } from "../config/configDb.js";

    export async function createProductosUsados(req, res) {
        try {
            const productosUsadosR = AppDataSource.getRepository(ProductosUsadosSchema);
            const productosUsados = req.body;
            
            console.log(productosUsados)
            // Validar que los campos requeridos no estén vacíos 
            if (!productosUsados.n_orden || !productosUsados.idProducto || !productosUsados.cantidad) {
                return res.status(400).json({
                    message: "Datos incompletos"
                  });
            }
            //valida si existe la orden en la tabla ordenes
            const ordenesR = AppDataSource.getRepository(OrdenesSchema);
            const ordenes = await ordenesR.findOneBy({ n_orden: productosUsados.n_orden });

            if (!ordenes) {
                console.log("La orden no está registrada");
                return handleErrorServer(res, 500, "Error al obtener la orden");
            }   

            //valida si existe el producto en la tabla inventary
            const inventaryR = AppDataSource.getRepository(InventarySchema);
            const inventary = await inventaryR.findOneBy({ idProducto: productosUsados.idProducto });
            if (!inventary) {
                console.log("El producto no está registrado");
                return res.status(500).json({
                    message: "El producto no está registrado"
                });
            }
            //valida que la cantidad de productosUsados no sea mayor a la cantidad de productos en inventary
            if (productosUsados.cantidad > inventary.stock) {
                console.log("La cantidad de productos usados es mayor a la cantidad de productos en inventary");
                return res.status(500).json({
                    message: "La cantidad de productos usados es mayor a la cantidad de productos en inventary"
                });
            }
            
            //inventary.cantidad = inventary.cantidad - productosUsados.cantidad;
            console.log(inventary.stock);
            console.log(productosUsados.cantidad);
            
            //valida si existe la combinacion de n_orden e idProducto
            const productosUsadosExiste = await productosUsadosR.findOneBy(
                { n_orden: productosUsados.n_orden, idProducto: productosUsados.idProducto });
            if (productosUsadosExiste) {
                console.log("La relación ya está registrada");
                return res.status(500).json({
                    message: "La relación ya está registrada"
                });
            }
            
            const newProductosUsados = productosUsadosR.create({
                n_orden: productosUsados.n_orden,
                idProducto: productosUsados.idProducto,
                cantidad: productosUsados.cantidad
            });
            
            const productosUsadosSaved = await productosUsadosR.save(newProductosUsados); 
            // Actualiza la cantidad de productos en inventary
            inventary.stock = inventary.stock - productosUsados.cantidad;
            await inventaryR.save(inventary);
            
            return res.status(201).json({
            message: "Producto creado",
            data : productosUsadosSaved
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error en el servidor"
            });
        }
    }


    export async function updateProductosUsados(req, res) {
        try {
            const productosUsadosR = AppDataSource.getRepository(ProductosUsadosSchema);
            const productosUsados = req.body;
    
            // Validar que los campos requeridos no estén vacíos 
            if (!productosUsados.n_orden || !productosUsados.idProducto || !productosUsados.cantidad) {
                return res.status(400).json({
                    message: "Datos incompletos"
                });
            }
            //valida si existe la orden en la tabla ordenes
            const ordenesR = AppDataSource.getRepository(OrdenesSchema);
            const ordenes = await ordenesR.findOneBy({ n_orden: productosUsados.n_orden });

            if (!ordenes) {
                console.log("La orden no está registrada");
                return handleErrorServer(res, 500, "Error al obtener la orden");
            }

            //valida si existe el producto en la tabla inventary
            const inventaryR = AppDataSource.getRepository(InventarySchema);
            const inventary = await inventaryR.findOneBy({ idProducto: productosUsados.idProducto });
            if (!inventary) {
                console.log("El producto no está registrado");
                return res.status(500).json({
                    message: "El producto no está registrado"
                });
            }
            //valida que la cantidad de productosUsados no sea mayor a la cantidad de productos en inventary
            console.log(productosUsados.cantidad);
            console.log(inventary.stock);
            if (productosUsados.cantidad > inventary.stock) {
                console.log("La cantidad de productos usados es mayor a la cantidad de productos en inventary");
                return res.status(500).json({
                    message: "La cantidad de productos usados es mayor a la cantidad de productos en inventary"
                });
            }

            //valida si existe la combinacion de n_orden e idProducto, solo si existe se actualiza
            const productosUsadosExiste = await productosUsadosR.findOneBy(
                { n_orden: productosUsados.n_orden, idProducto: productosUsados.idProducto });
            if (!productosUsadosExiste) {
                console.log("La relación no está registrada");
                return res.status(500).json({
                    message: "La relación no está registrada"
                });
            }
            // Actualiza la cantidad de productos en productosUsados
            productosUsadosExiste.cantidad += productosUsados.cantidad;
            await productosUsadosR.save(productosUsadosExiste);

            // Actualiza la cantidad de productos en inventary
            inventary.stock -= productosUsados.cantidad;
            await inventaryR.save(inventary);
    
            return res.status(200).json({
                message: "Relación actualizada y stock ajustado",
                data: inventary
            });
        } catch (error) {
            console.error("Error en el servidor:", error.message);
            return res.status(500).json({
                message: "Error en el servidor",
                error: error.message // Incluye el mensaje de error específico para depuración
            });
        }
    }
    