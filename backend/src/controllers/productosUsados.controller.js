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
            // Valida que los campos requeridos no estén vacíos 
            if (!productosUsados.n_orden || !productosUsados.idProducto || !productosUsados.cantidad) {
                return handleErrorClient(res, 404, "Datos incompletos",productosUsados);
            }
            //valida si existe la orden en la tabla ordenes
            const ordenesR = AppDataSource.getRepository(OrdenesSchema);
            const ordenes = await ordenesR.findOneBy({ n_orden: productosUsados.n_orden });

            if (!ordenes) {
                console.log("La orden no está registrada");
                return handleErrorClient(res, 404, "La orden no está registrada",productosUsados);
            }   

            //valida si existe el producto en la tabla inventary
            const inventaryR = AppDataSource.getRepository(InventarySchema);
            const inventary = await inventaryR.findOneBy({ idProducto: productosUsados.idProducto });
            if (!inventary) {
                console.log("El producto no está registrado");
                return handleErrorClient(res, 404, "El producto no está registrado",productosUsados);
            }
            //valida que la cantidad de productosUsados no sea mayor a la cantidad de productos en inventary
            if (productosUsados.cantidad > inventary.stock) {
                console.log("La cantidad de productos usados es mayor a la cantidad de productos en inventary");
                return handleErrorClient(res, 404, 
                    "La cantidad de productos usados es mayor a la cantidad de productos en inventary",productosUsados);
            }
            
            console.log(inventary.stock);
            console.log(productosUsados.cantidad);
            
            //valida si existe la combinacion de n_orden e idProducto
            const productosUsadosExiste = await productosUsadosR.findOneBy(
                { n_orden: productosUsados.n_orden, idProducto: productosUsados.idProducto });
            if (productosUsadosExiste) {
                console.log("La relación ya está registrada");
                return handleErrorClient(res, 404, 
                    "La relación ya está registrada entre Orden de trabajo y producto ya existe",productosUsados);
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

            return handleSuccess(res, 200, "Producto creado correctamente", productosUsadosSaved);
        } catch (error) {
            return handleErrorServer(res, 500, error.message);
        }
    }


    export async function updateProductosUsados(req, res) {
        try {
            const productosUsadosR = AppDataSource.getRepository(ProductosUsadosSchema);
            const productosUsados = req.body;
    
            // Valida que los campos requeridos no estén vacíos 
            if (!productosUsados.n_orden || !productosUsados.idProducto || !productosUsados.cantidad) {
                return handleErrorClient(res, 404, "Datos incompletos",productosUsados);
            }
            //valida si existe la orden en la tabla ordenes
            const ordenesR = AppDataSource.getRepository(OrdenesSchema);
            const ordenes = await ordenesR.findOneBy({ n_orden: productosUsados.n_orden });

            if (!ordenes) {
                console.log("La orden de trabajo no está registrada");
                return handleErrorClient(res, 404, "La orden de trabajo no está registrada",productosUsados);
            }

            //valida si existe el producto en la tabla inventary
            const inventaryR = AppDataSource.getRepository(InventarySchema);
            const inventary = await inventaryR.findOneBy({ idProducto: productosUsados.idProducto });
            if (!inventary) {
                console.log("El producto no está registrado");
                return handleErrorClient(res, 404, "El producto no está registrado",productosUsados);
            }
            //valida que la cantidad de productosUsados no sea mayor a la cantidad de productos en inventary
            console.log(productosUsados.cantidad);
            console.log(inventary.stock);
            if (productosUsados.cantidad > inventary.stock) {
                console.log("La cantidad de productos usados es mayor a la cantidad de productos en inventary");
                return handleErrorClient(res, 404, 
                    "La cantidad de productos usados es mayor a la cantidad de productos en inventary",productosUsados);
            }

            //valida si existe la combinacion de n_orden e idProducto, solo si existe se actualiza
            const productosUsadosExiste = await productosUsadosR.findOneBy(
                { n_orden: productosUsados.n_orden, idProducto: productosUsados.idProducto });
            if (!productosUsadosExiste) {
                console.log("La relación no está registrada");
                return handleErrorClient(res, 404, "La relación no está registrada",productosUsados);
            }
            // Actualiza la cantidad de productos en productosUsados
            productosUsadosExiste.cantidad += productosUsados.cantidad;
            await productosUsadosR.save(productosUsadosExiste);

            // Actualiza la cantidad de productos en inventary
            inventary.stock -= productosUsados.cantidad;
            await inventaryR.save(inventary);

            return handleSuccess(res, 200, "Relación actualizada y stock ajustado", inventary); 
        } catch (error) {
            console.error("Error en el servidor:", error.message);
            return handleErrorServer(res, 500, error.message);
        }
    }
    