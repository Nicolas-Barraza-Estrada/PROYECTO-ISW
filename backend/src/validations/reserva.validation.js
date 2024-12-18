"use strict";
import Joi from "joi";

const domainEmailValidator = (value, helper) => {
    if (!value.endsWith("@gmail.cl")) {
      return helper.message(
        "El correo electrónico debe ser del dominio @gmail.cl"
      );
    }
    return value;
  };

export const reservaBodyValidation = Joi.object({


  id_sesion: Joi.number()
  .integer()
  .positive()
  .messages({
    "number.base": "El id debe ser un número.",
    "number.integer": "El id debe ser un número entero.",
    "number.positive": "El id debe ser un número positivo.",
  }),
    
  rut_usuario: Joi.string()
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

  nombre_cliente: Joi.string()
  .min(15)
  .max(50)
  .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
  .messages({
    "string.empty": "El nombre completo no puede estar vacío.",
    "string.base": "El nombre completo debe ser de tipo string.",
    "string.min": "El nombre completo debe tener como mínimo 15 caracteres.",
    "string.max": "El nombre completo debe tener como máximo 50 caracteres.",
    "string.pattern.base":
      "El nombre completo solo puede contener letras y espacios.",
  }),
    fono_cliente: Joi.string()
        .min(9)
        .max(12)
        .pattern(/^\+?[0-9]+$/)
        .messages({
            "string.empty": "El fono_cliente no puede estar vacío.",
            "string.base": "El fono_cliente debe ser de tipo string.",
            "string.min": "El fono_cliente debe tener como mínimo 9 caracteres.",
            "string.max": "El fono_cliente debe tener como máximo 12 caracteres.",
            "string.pattern.base": "El fono_cliente debe ser un número.",
        }),
        email_cliente: Joi.string()
        .min(15)
        .max(30)
        .email()
        .messages({
            "string.empty": "El email no puede estar vacío.",
            "any.required": "El email es obligatorio",
            "string.base": "El email debe tener formato con dominio apropiado.",
            "string.min": "El email debe tener como mínimo 15 caracteres.",
            "string.max": "El email debe tener como máximo 30 caracteres",
        })
        .custom(domainEmailValidator, "Validación dominio email"),

})
