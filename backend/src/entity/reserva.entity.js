"use strict";
import { EntitySchema } from "typeorm";

const ReservaSchema = new EntitySchema({
    name: "Reserva",
    tableName: "reserva",
    columns: {
        id_sesion: {
            type: "int",
            primary: true,
        },
        rut_usuario: {
            type: "varchar",
            primary: true,
            length: 12,
            nullable: false,
            unique: true,
        },
        nombre_cliente: {
            type: "varchar",
            length: 255, 
        },
        fono_cliente: {
            type: "varchar",
            length: 15, 
        },
        email_cliente: {
            type: "varchar",
            length: 255,
            nullable: false,
            unique: true,
        },
    },
    relations: {
        sesion: {
            target: "Sesion", 
            type: "many-to-one", 
            joinColumn: {
                name: "id_sesion",
                referencedColumnName: "id_sesion",
            },
        },
        usuario: {
            target: "User", 
            type: "many-to-one",            
            joinColumn: {
                name: "rut_usuario",
                referencedColumnName: "rut",
            },
        },
    },
});

export default ReservaSchema;