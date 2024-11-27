"use strict";
import Joi from "joi";

<<<<<<< HEAD
// Función personalizada para validar la fecha en formato dd-mm-aaaa
const dateFormat = (value, helpers) => {
  // Expresión regular para validar dd-mm-aaaa
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  if (!regex.test(value)) {
    return helpers.error("date.format", { message: "La fecha debe estar en formato dd-mm-aaaa." });
  }

  // Convertir la fecha a formato YYYY-MM-DD
  const [day, month, year] = value.split("-");
  const formattedDate = `${year}-${month}-${day}`;

  // Comprobar si la fecha es válida
  const date = new Date(formattedDate);
  if (isNaN(date)) {
    return helpers.error("date.invalid", { message: "La fecha es inválida." });
  }

  return formattedDate; // Devolver la fecha en formato YYYY-MM-DD
};

=======
>>>>>>> 08061d1ab962fa06bd9279496e351ebdda0ac7bb
// Validación del cuerpo (body) de la solicitud para crear o actualizar una sesión
export const sesionBodyValidation = Joi.object({
  disponibilidad: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "La disponibilidad debe ser de tipo booleano.",
      "any.required": "La disponibilidad es un campo obligatorio.",
    }),
<<<<<<< HEAD

  // Validación de la fecha con formato personalizado
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
      // Convertir la fecha de formato dd-mm-aaaa a un objeto Date para la comparación
      const date = new Date(value);
      const now = new Date();
      
      // Comprobar que la fecha es mayor o igual a la actual
      if (date < now) {
        return helpers.error("date.greater", { message: "La fecha debe ser igual o posterior a la fecha actual." });
      }

      return value; // Si la fecha es válida y cumple la condición, devolverla
    })
=======
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
>>>>>>> 08061d1ab962fa06bd9279496e351ebdda0ac7bb
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
<<<<<<< HEAD
  });
=======
  });

>>>>>>> 08061d1ab962fa06bd9279496e351ebdda0ac7bb
