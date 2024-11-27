"use strict";
import Joi, { x } from "joi";

const domainEmailValidator = (value, helper) => {
    if (!value.endsWith("@gmail.cl")) {
      return helper.message(
        "El correo electrónico debe ser del dominio @gmail.cl"
      );
    }
    return value;
  };

export const createOrdenesValidation = Joi.object({
    n_orden: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El n_orden debe ser un número.",
      "number.integer": "El n_orden debe ser un número entero.",
      "number.positive": "El n_orden debe ser un número positivo.",
    }),
    rut_Trabajador: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
    //nombreCliente,fono_cliente,email_cliente,descripcion,estado,costo
    nombreCliente: Joi.string()
    .min(3)
    .max(50)
    .messages({
      "string.empty": "El nombre del cliente no puede estar vacío.",
      "string.base": "El nombre del cliente debe ser de tipo string.",
      "string.min": "El nombre del cliente debe tener como mínimo 3 caracteres.",
      "string.max": "El nombre del cliente debe tener como máximo 50 caracteres.",
    }),
    fono_cliente: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.empty": "El fono_cliente no puede estar vacío.",
      "string.base": "El fono_cliente debe ser de tipo string.",
      "string.min": "El fono_cliente debe tener como mínimo 9 caracteres.",
      "string.max": "El fono_cliente debe tener como máximo 12 caracteres.",
      "string.pattern.base": "El fono_cliente debe ser un número.",
    }),
    email_cliente: Joi.string()
    .min(15)
    .max(35)
    .email()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.base": "El correo electrónico debe ser de tipo string.",
      "string.email": "El correo electrónico debe finalizar en @gmail.cl.",
      "string.min":
        "El correo electrónico debe tener como mínimo 15 caracteres.",
      "string.max":
        "El correo electrónico debe tener como máximo 35 caracteres.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
    descripcion: Joi.string()
    .min(10)
    .max(100)
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "string.base": "La descripción debe ser de tipo string.",
      "string.min": "La descripción debe tener como mínimo 10 caracteres.",
      "string.max": "La descripción debe tener como máximo 100 caracteres.",
    }),
    estado: Joi.string()
    .min(3)
    .max(20)
    .messages({
      "string.empty": "El estado no puede estar vacío.",
      "string.base": "El estado debe ser de tipo string.",
      "string.min": "El estado debe tener como mínimo 3 caracteres.",
      "string.max": "El estado debe tener como máximo 20 caracteres.",
    }),
    costo: Joi.number()
    .positive()
    .messages({
      "number.base": "El costo debe ser un número.",
    }),

})

export const updateOrdenesValidation = Joi.object({
    // descripcion, estado, costo
    descripcion: Joi.string()
    .min(10)
    .max(100)
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "string.base": "La descripción debe ser de tipo string.",
      "string.min": "La descripción debe tener como mínimo 10 caracteres.",
      "string.max": "La descripción debe tener como máximo 100 caracteres.",
    }),
    estado: Joi.string()
    .min(3)
    .max(20)
    .messages({
      "string.empty": "El estado no puede estar vacío.",
      "string.base": "El estado debe ser de tipo string.",
      "string.min": "El estado debe tener como mínimo 3 caracteres.",
      "string.max": "El estado debe tener como máximo 20 caracteres.",
    }),
    costo: Joi.number()
    .positive()
    .messages({
      "number.base": "El costo debe ser un número.",
    }),
})