"use strict";
import { EntitySchema } from "typeorm";
import UserSchema from "./user.entity.js";

const asistenciaSchema = new EntitySchema({
  name: "Asistencia",
  tableName: "asistencias",
  columns: {
    id_asistencia: {
        type: "int",
        primary: true,
        generated: true,
    },
    fecha: {
        type: "date",
        nullable: false,
    },
    hora_entrada: {
        type: "time with time zone",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
    },
    hora_salida: {
        type: "time with time zone",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
        nullable: false,
    },

    usuarioId: {
      type: "int",
      nullable: false,
    }
  },
  relations: {
    usuario: {
      type: "many-to-one",
      target: UserSchema,
      joinColumn: { name: "usuarioId", referencedColumnName: "id" },
    }
  }
});

export default asistenciaSchema;


