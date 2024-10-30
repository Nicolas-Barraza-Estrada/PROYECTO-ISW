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
      return handleErrorClient(res, 404, "Datos incompletos",inventary);
    }
    
    //valida si el nombre ya existe
    const inventaryExist = await inventaryR.findOne({ where: { nombre: inventary.nombre } });
    if(inventaryExist){
      return handleErrorClient(res, 404, "El nombre ya existe",inventaryExist);
    }

    // el nombre > 3, el precio mayor que 0, el stock mayor que 0
    if(inventary.nombre.length < 3 || inventary.precio < 1 || inventary.stock < 1){
      return handleErrorClient(res, 404, "Los datos ingresados no cumplen los requisitos",inventary);
    }

    const newInventary = inventaryR.create(
      {
        nombre: inventary.nombre,
        precio: inventary.precio,
        stock: inventary.stock,
      }
    );
    const inventarySaved = await inventaryR.save(newInventary); 

    return handleSuccess(res, 200, "Producto creado correctamente", inventarySaved);
  } catch (error) {
    return handleErrorServer(res, 500, error.message);
  }
}

//obtener todos los productos
export async function getInventary(req, res){
  try {
    const inventaryR = AppDataSource.getRepository(InventarySchema);
    const inventary = await inventaryR.find();

    return handleSuccess(res, 200, "Lista de productos obtenida correctamente", inventary);
  } catch (error) {
    return handleErrorServer(res, 500, error.message);
  }
}

//obtener un producto por el nombre
export async function getInventaryById(req, res){
  try {
    const inventaryR = AppDataSource.getRepository(InventarySchema);
    const inventary = await inventaryR.findOne({ where: { nombre: req.params.nombre } });

    if(!inventary){
      return handleErrorServer(res, 500, "El producto no existe");
    }

    return handleSuccess(res, 200, "Producto obtenido correctamente", inventary);
  } catch (error) {
    return handleErrorServer(res, 500, error.message);
  }
}

// update segun el id
export async function updateInventary(req, res){
  try {
    const inventaryR = AppDataSource.getRepository(InventarySchema);
    const inventary = req.body;

    if(!inventary.nombre || !inventary.precio || !inventary.stock){
      return handleErrorClient(res, 404, "Datos incompletos",inventary);
    }

    const inventaryExist = await inventaryR.findOne({ where: { idProducto: inventary.idProducto } });
    if(!inventaryExist){
      return handleErrorServer(res, 500, "El producto no existe");
    }

    // el nombre, el precio mayor que 0, el stock mayor que 0
    if(inventary.nombre.length < 3 || inventary.precio < 1 || inventary.stock < 1){
      return handleErrorClient(res, 404, "Los datos ingresados no cumplen los requisitos",inventary);
    }

    inventaryExist.nombre = inventary.nombre;
    inventaryExist.precio = inventary.precio;
    inventaryExist.stock = inventary.stock;

    const inventaryUpdated = await inventaryR.save(inventaryExist);

    return handleSuccess(res, 200, "Producto actualizado correctamente", inventaryUpdated);
  } catch (error) {
    return handleErrorServer(res, 500, error.message);
  }
}

// eliminar segun el id
export async function deleteInventary(req, res){
  try {
    const inventaryR = AppDataSource.getRepository(InventarySchema);
    const inventary = await inventaryR.findOne({ where: { idProducto: req.params.idProducto } });
    
    if(!inventary){
      return handleErrorServer(res, 500, "El producto no existe");
    }

    await inventaryR.remove(inventary);

    return handleSuccess(res, 200, "Producto eliminado correctamente", inventaryUpdated);

    ;
  } catch (error) {
    return handleErrorServer(res, 500, error.message);
  }
}