//inventary.validations.js
"use strict";
import Joi from "joi";

export const inventaryQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo.",
        }),
    name: Joi.string()
        .min(3)
        .max(50)
        .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 50 caracteres.",
        }),
    })
    .or("id", "name")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
        "Debes proporcionar al menos un parámetro: id o name.",
    });

export const inventaryBodyValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 50 caracteres.",
        }),
    stock: Joi.number()
        .integer()
        .positive()
        .messages({
        "number.base": "El stock debe ser un número.",
        "number.integer": "El stock debe ser un número entero.",
        "number.positive": "El stock debe ser un número positivo.",
        }),
    })
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
    });

    