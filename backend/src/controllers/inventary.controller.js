//inventary.controller.js , solo controlador, sin valdaciones ni services
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";
import InventarySchema from "../entity/inventary.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createInventary(req, res) {
  try {
    const inventaryR = AppDataSource.getRepository(InventarySchema);
    const inventary = req.body;

    if(!inventary.nombre || !inventary.precio || !inventary.stock){
      return res.status(400).json({
        message: "Datos incompletos"
      });
    }
    
    //valida si el id ya existe
    const inventaryExist = await inventaryR.findOneBy({ id: inventary.id });
    if(inventaryExist){
      return res.status(400).json({
        message: "El id ya existe"
      });
    }
    // el nombre, el precio mayor que 0, el stock mayor que 0
    if(inventary.nombre.length < 3 || inventary.precio < 1 || inventary.stock < 1){
      return res.status(400).json({
        message: "Datos incorrectos"
      });
    }

    const newInventary = inventaryR.create(
      {
        nombre: inventary.nombre,
        precio: inventary.precio,
        stock: inventary.stock,
      }
    );
    const inventarySaved = await inventaryR.save(newInventary); 

    return res.status(201).json({
      message: "Producto creado",
      data : inventarySaved
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear el producto",
      error: error.message
    });
  }
}