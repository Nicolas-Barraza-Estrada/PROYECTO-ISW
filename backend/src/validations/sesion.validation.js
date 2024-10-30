"use strict";
import Joi from "joi";

// Validación del cuerpo (body) de la solicitud para crear o actualizar una sesión
export const sesionBodyValidation = Joi.object({
  disponibilidad: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "La disponibilidad debe ser de tipo booleano.",
      "any.required": "La disponibilidad es un campo obligatorio.",
    }),
  fecha: Joi.date()
    .iso()
    .greater('now')
    .required()
    .messages({
      "date.base": "La fecha debe ser de tipo fecha.",
      "date.iso": "La fecha debe estar en formato YYYY-MM-DD.",
      'date.greater': 'La fecha debe ser igual o posterior a la fecha actual.',
      "any.required": "La fecha es un campo obligatorio.",
    })
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });

