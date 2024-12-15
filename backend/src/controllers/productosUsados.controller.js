import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
  } from "../handlers/responseHandlers.js";
  import ProductosUsadosSchema from "../entity/ProductosUsados.entity.js";
  import InventarySchema from "../entity/inventary.entity.js";
  import OrdenesSchema from "../entity/ordenes.entity.js";
  import { AppDataSource } from "../config/configDb.js";
  import { createProductoUsadoValidation } from "../validations/productosUsados.validation.js";
  import { updateProductoUsadoValidation } from "../validations/productosUsados.validation.js";
    export async function createProductosUsados(req, res) {
        try {
            const productosUsadosR = AppDataSource.getRepository(ProductosUsadosSchema);
            const productosUsados = req.body;
            
            const { error } = createProductoUsadoValidation.validate(productosUsados);
            if (error) {
                return handleErrorClient(res, 404, error.details[0].message,productosUsados);
            }

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

            const { error } = updateProductoUsadoValidation.validate(productosUsados);
            if (error) {
                return handleErrorClient(res, 404, error.details[0].message,productosUsados);
            }
    
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
            // retorn productosUsados y el nombre del producto
            const inventaryUpdated = await inventaryR.findOneBy({ idProducto: productosUsados.idProducto });
            return handleSuccess(res, 200, "Producto actualizado correctamente", {
                n_orden: productosUsados.n_orden,
                idProducto: productosUsados.idProducto,
                nombre: inventary.nombre,
                cantidad: productosUsadosExiste.cantidad,
                stock: inventaryUpdated.stock
            });

        } catch (error) {
            console.error("Error en el servidor:", error.message);
            return handleErrorServer(res, 500, error.message);
        }
    }


    export async function getProductsUsed(req, res) {
        // recibe n_orden y retorna los productos usados en esa orden
        try {
            const productosUsadosR = AppDataSource.getRepository(ProductosUsadosSchema);
            const n_orden = req.params.n_orden;
            const productosUsados = await productosUsadosR.findBy({ n_orden: n_orden });
            if (productosUsados.length === 0) {
                return handleErrorClient(res, 404, "No hay productos usados en esta orden",productosUsados);
            }
            
            const productosUsadosList = [];
            for (let i = 0; i < productosUsados.length; i++) {
                const inventaryR = AppDataSource.getRepository(InventarySchema);
                const inventary = await inventaryR.findOneBy({ idProducto: productosUsados[i].idProducto });
                productosUsadosList.push({
                    n_orden: productosUsados[i].n_orden,
                    idProducto: productosUsados[i].idProducto,
                    nombre: inventary.nombre,
                    cantidad: productosUsados[i].cantidad,
                    stock : inventary.stock
                });
            }
            return handleSuccess(res, 200, "Productos usados obtenidos correctamente", productosUsadosList);


        } catch (error) {
            return handleErrorServer(res, 500, error.message
            );

    }
}

    //listar productos dispobibles ppara relacionar con ordenes, recibe n_orden, 
    //obtiene los productos usados en esa orden y retorna los productos que no tienen relación
    export async function getProductosDisponibles(req, res) {
        try {
            const productosUsadosR = AppDataSource.getRepository(ProductosUsadosSchema);
            const n_orden = req.params.n_orden;
            const productosUsados = await productosUsadosR.findBy({ n_orden: n_orden });
            console.log(productosUsados);
            if (productosUsados.length === 0) {
                return handleErrorClient(res, 404, "No hay productos usados en esta orden",productosUsados);
            }
            const inventaryR = AppDataSource.getRepository(InventarySchema);
            const inventary = await inventaryR.find();
            console.log(inventary);
            
            const productosDisponibles = [];
            for (let i = 0; i < inventary.length; i++) {
                let existe = false;
                for (let j = 0; j < productosUsados.length; j++) {
                    if (inventary[i].idProducto === productosUsados[j].idProducto) {
                        existe = true;
                        break;
                    }
                }
                if (!existe) {
                    productosDisponibles.push(inventary[i]);
                }
            }
            return handleSuccess(res, 200, "Productos disponibles obtenidos correctamente", productosDisponibles);
        } catch (error) {
            return handleErrorServer(res, 500, error.message);
        }
    }
