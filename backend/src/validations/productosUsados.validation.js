"use strict";
import Joi from "joi";

export const createProductoUsadoValidation = Joi.object({
    //n_orden,idProducto,cantidad
    n_orden: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El n_orden debe ser un número.",
      "number.integer": "El n_orden debe ser un número entero.",
      "number.positive": "El n_orden debe ser un número positivo.",
    }),
    idProducto: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El idProducto debe ser un número.",
      "number.integer": "El idProducto debe ser un número entero.",
      "number.positive": "El idProducto debe ser un número positivo.",
    }),
    cantidad: Joi.number()
    .integer()
    .messages({
      "number.base": "La cantidad debe ser un número.",
      "number.integer": "La cantidad debe ser un número entero.",
    }),
})

export const updateProductoUsadoValidation = Joi.object({
    //n_orden,idProducto,cantidad
    n_orden: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El n_orden debe ser un número.",
      "number.integer": "El n_orden debe ser un número entero.",
      "number.positive": "El n_orden debe ser un número positivo.",
    }),
    idProducto: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El idProducto debe ser un número.",
      "number.integer": "El idProducto debe ser un número entero.",
      "number.positive": "El idProducto debe ser un número positivo.",
    }),
    cantidad: Joi.number()
    .integer()
    .messages({
      "number.base": "La cantidad debe ser un número.",
      "number.integer": "La cantidad debe ser un número entero.",
    }),
}
)