//esquema para el inventario de un taller de bucicletas
"use strict";
import { EntitySchema } from "typeorm";

const InventarySchema = new EntitySchema({ 
    name: "Inventary",
    tableName: "inventary",
    columns: {
        id: {
        type: "int",
        primary: true,
        generated: true,
        },
        nombre: {
        type: "varchar",
        length: 255,
        nullable: false,
        },
        precio: {
        type: "int",
        nullable: false,
        },
        stock: {
        type: "int",
        nullable: false,
        },
        createdAt: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
        },
        updatedAt: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
        nullable: false,
        },
    },
    indices: [
        {
        name: "IDX_INVENTARY",
        columns: ["id"],
        unique: true,
        },
        {
        name: "IDX_INVENTARY_NOMBRE",
        columns: ["nombre"],
        unique: true,
        },
    ],
    });

export default InventarySchema;