//inventary.controller.js , solo controlador, sin valdaciones ni services
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
  } from "../handlers/responseHandlers.js";
  import ProductosUsadosSchema from "../entity/ProductosUsados.entity.js";
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
            
            const productosUsadosExiste = await productosUsadosR.findOneBy({ n_orden: productosUsados.n_orden });
            if (productosUsadosExiste) {
                console.log("El nuemro de orden ya está registrado");
                handleErrorServer(res, 500, "El nuemro de orden ya está registrado",
                 "El nuemro de orden ya está registrado")
            };
            
            const newProductosUsados = productosUsadosR.create({
                n_orden: productosUsados.n_orden,
                idProducto: productosUsados.idProducto,
                cantidad: productosUsados.cantidad
            });
            
            const productosUsadosSaved = await productosUsadosR.save(newProductosUsados); 
        
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
    