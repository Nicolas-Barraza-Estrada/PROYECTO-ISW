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
    
    //valida si el nombre ya existe
    const inventaryExist = await inventaryR.findOne({ where: { nombre: inventary.nombre } });
    if(inventaryExist){
      return res.status(400).json({
        message: "Producto ya existe"
      });
    }

    // el nombre > 3, el precio mayor que 0, el stock mayor que 0
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

//obtener todos los productos
export async function getInventary(req, res){
  try {
    const inventaryR = AppDataSource.getRepository(InventarySchema);
    const inventary = await inventaryR.find();

    return res.status(200).json({
      message: "Productos obtenidos",
      data: inventary
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message
    });
  }
}

//obtener un producto por el nombre
export async function getInventaryById(req, res){
  try {
    const inventaryR = AppDataSource.getRepository(InventarySchema);
    const inventary = await inventaryR.findOne({ where: { nombre: req.params.nombre } });

    if(!inventary){
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      message: "Producto obtenido",
      data: inventary
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el producto",
      error: error.message
    });
  }
}

// update segun el id
export async function updateInventary(req, res){
  try {
    const inventaryR = AppDataSource.getRepository(InventarySchema);
    const inventary = req.body;

    if(!inventary.nombre || !inventary.precio || !inventary.stock){
      return res.status(400).json({
        message: "Datos incompletos"
      });
    }

    const inventaryExist = await inventaryR.findOne({ where: { idProducto: inventary.idProducto } });
    if(!inventaryExist){
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    // el nombre, el precio mayor que 0, el stock mayor que 0
    if(inventary.nombre.length < 3 || inventary.precio < 1 || inventary.stock < 1){
      return res.status(400).json({
        message: "Datos incorrectos"
      });
    }

    inventaryExist.nombre = inventary.nombre;
    inventaryExist.precio = inventary.precio;
    inventaryExist.stock = inventary.stock;

    const inventaryUpdated = await inventaryR.save(inventaryExist);

    return res.status(200).json({
      message: "Producto actualizado",
      data: inventaryUpdated
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el producto",
      error: error.message
    });
  }
}

// eliminar segun el id
export async function deleteInventary(req, res){
  try {
    const inventaryR = AppDataSource.getRepository(InventarySchema);
    const inventary = await inventaryR.findOne({ where: { idProducto: req.params.idProducto } });
    
    if(!inventary){
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    await inventaryR.remove(inventary);

    return res.status(200).json({
      message: "Producto eliminado"
    });

    ;
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el producto",
      error: error.message
    });
  }
}