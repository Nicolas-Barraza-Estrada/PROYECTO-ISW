"use strict";
import Joi from "joi";

const domainEmailValidator = (value, helper) => {
  if (!value.endsWith("@gmail.cl")) {
    return helper.message(
      "El correo electrónico debe finalizar en @gmail.cl."
    );
  }
  return value;
};

export const createOrdenesValidation = Joi.object({
  rut_Trabajador: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .required()
    .messages({
      "string.empty": "El RUT no puede estar vacío.",
      "string.base": "El RUT debe ser de tipo texto.",
      "string.min": "El RUT debe tener como mínimo 9 caracteres.",
      "string.max": "El RUT debe tener como máximo 12 caracteres.",
      "string.pattern.base": "El RUT debe tener el formato xx.xxx.xxx-x o xxxxxxxx-x.",
      "any.required": "El RUT es obligatorio.",
    }),
  nombreCliente: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "El nombre del cliente no puede estar vacío.",
      "string.base": "El nombre del cliente debe ser de tipo texto.",
      "string.min": "El nombre del cliente debe tener como mínimo 3 caracteres.",
      "string.max": "El nombre del cliente debe tener como máximo 50 caracteres.",
      "any.required": "El nombre del cliente es obligatorio.",
    }),
  fono_cliente: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": "El número de teléfono no puede estar vacío.",
      "string.base": "El número de teléfono debe ser de tipo texto.",
      "string.min": "El número de teléfono debe tener como mínimo 9 caracteres.",
      "string.max": "El número de teléfono debe tener como máximo 12 caracteres.",
      "string.pattern.base": "El número de teléfono debe contener solo números.",
      "any.required": "El número de teléfono es obligatorio.",
    }),
  email_cliente: Joi.string()
    .min(15)
    .max(35)
    .email()
    .required()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.base": "El correo electrónico debe ser de tipo texto.",
      "string.email": "El correo electrónico debe ser válido.",
      "string.min": "El correo electrónico debe tener como mínimo 15 caracteres.",
      "string.max": "El correo electrónico debe tener como máximo 35 caracteres.",
      "any.required": "El correo electrónico es obligatorio.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  descripcion: Joi.string()
    .min(10)
    .max(100)
    .required()
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "string.base": "La descripción debe ser de tipo texto.",
      "string.min": "La descripción debe tener como mínimo 10 caracteres.",
      "string.max": "La descripción debe tener como máximo 100 caracteres.",
      "any.required": "La descripción es obligatoria.",
    }),
  estado: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.empty": "El estado no puede estar vacío.",
      "string.base": "El estado debe ser de tipo texto.",
      "string.min": "El estado debe tener como mínimo 3 caracteres.",
      "string.max": "El estado debe tener como máximo 20 caracteres.",
      "any.required": "El estado es obligatorio.",
    }),

}).unknown(false).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

// Validación para actualizar órdenes
export const updateOrdenesValidation = Joi.object({
  n_orden: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El número de orden debe ser un número.",
      "number.integer": "El número de orden debe ser un número entero.",
      "number.positive": "El número de orden debe ser un número positivo.",
    }),
  descripcion: Joi.string()
    .min(10)
    .max(100)
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "string.base": "La descripción debe ser de tipo texto.",
      "string.min": "La descripción debe tener como mínimo 10 caracteres.",
      "string.max": "La descripción debe tener como máximo 100 caracteres.",
    }),
  estado: Joi.string()
    .min(3)
    .max(20)
    .messages({
      "string.empty": "El estado no puede estar vacío.",
      "string.base": "El estado debe ser de tipo texto.",
      "string.min": "El estado debe tener como mínimo 3 caracteres.",
      "string.max": "El estado debe tener como máximo 20 caracteres.",
    }),
  costo: Joi.number()
    .positive()
    .messages({
      "number.base": "El costo debe ser un número.",
      "number.positive": "El costo debe ser un número positivo.",
    }),
}).unknown(false).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});
