// Ordenes de Trabajo
/* 
*rut_Trabajor /(FK)
n° orden
nombreCliente
fono_cliente
email_cliente
descripcion
estado
costo
*/

"use strict";
import { EntitySchema } from "typeorm";

const OrdenesSchema = new EntitySchema({
    name: "Ordenes",
    tableName: "ordenes",
    columns: {
        rut_Trabajador: {
            type: "varchar",
            nullable: false
        },
        n_orden: {
            type: "varchar",
            nullable: false,
            primary: true // Esto indica que será clave primaria
        },
        nombreCliente: {
            type: "varchar",
            nullable: false
        },
        fono_cliente: {
            type: "varchar",
            nullable: false
        },
        email_cliente: {
            type: "varchar",
            nullable: false
        },
        descripcion: {
            type: "varchar",
            nullable: false
        },
        estado: {
            type: "varchar",
            nullable: false
        },
        costo: {
            type: "int",
            nullable: false
        }
    },
    relations: {
        trabajador: {
            target: "users",
            type: "many-to-one",
            joinColumn: { name: "rut" }
        }
    }
});


export default OrdenesSchema;