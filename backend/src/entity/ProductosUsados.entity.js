//esquema ProductosUsados
/*
*n_orden (PK FK)
*idProducto (FK)
Cantidad
*/

"use strict";
import { EntitySchema } from "typeorm";

const ProductosUsadosSchema = new EntitySchema({
    name: "ProductosUsados",
    tableName: "productosUsados",
    columns: {
        n_orden: {
            type: "varchar",
            nullable: false,
            primary: true
        },
        idProducto: {
            type: "varchar",
            nullable: false,
            primary: true
        },
        cantidad: {
            type: "int",
            nullable: false
        }
    },
    relations: {
        ordenes: {
            target: "ordenes",
            type: "many-to-one",
            joinColumn: { name: "n_orden" }
        },
        productos: {
            target: "inventary",
            type: "many-to-one",
            joinColumn: { name: "idProducto" }
        }
    }
});
export default ProductosUsadosSchema;