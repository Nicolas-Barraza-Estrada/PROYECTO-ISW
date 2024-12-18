"use strict";
import Joi from "joi";

const dateFormat = (value, helpers) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;
  if (!regex.test(value)) {
    return helpers.error("date.format", { message: "La fecha debe estar en formato dd-mm-aaaa." });
  }

  const [day, month, year] = value.split("-");
  const formattedDate = `${year}-${month}-${day}`;

  const date = new Date(formattedDate);
  if (isNaN(date)) {
    return helpers.error("date.invalid", { message: "La fecha es inválida." });
  }

  return formattedDate; 
}

export const sesionBodyValidation = Joi.object({
  nombreSesion: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "El nombre de la sesión debe ser una cadena de texto.",
      "string.empty": "El nombre de la sesión no puede estar vacío.",
      "string.min": "El nombre de la sesión debe tener al menos 3 caracteres.",
      "string.max": "El nombre de la sesión no puede tener más de 100 caracteres.",
      "any.required": "El nombre de la sesión es un campo obligatorio.",
    }),

  disponibilidad: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "La disponibilidad debe ser de tipo booleano.",
      "any.required": "La disponibilidad es un campo obligatorio.",
    }),

  fecha: Joi.string()
    .custom(dateFormat, "Validación de fecha en formato dd-mm-aaaa")
    .required()
    .messages({
      "string.base": "La fecha debe ser una cadena de texto.",
      "date.format": "La fecha debe estar en formato dd-mm-aaaa.",
      "date.invalid": "La fecha es inválida.",
      "any.required": "La fecha es un campo obligatorio.",
    })
    .custom((value, helpers) => {
      const [day, month, year] = value.split("-");
      const formattedDate = `${year}-${month}-${day}`;
      const date = new Date(formattedDate);

      const now = new Date();
      now.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);

      if (date < now) {
        return helpers.error("date.invalid", { message: "La fecha debe ser igual o posterior a la fecha actual." });
      }

      return value; 
    }),
})
  .messages({
    "object.unknown": "No se permiten propiedades adicionales."
  })
  .unknown(false);
