"use strict";
import { EntitySchema } from "typeorm";

const SesionSchema = new EntitySchema({
    name: "Sesion",
    tableName: "sesion",
    columns:{
        id_sesion:{
            type: "int",
            primary: true,
            generated: true,
        },
        disponibilidad:{
            type: "boolean",
            nullable: false,
        },
        fecha: {
            type: "date",
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
    }

})

export default SesionSchema;