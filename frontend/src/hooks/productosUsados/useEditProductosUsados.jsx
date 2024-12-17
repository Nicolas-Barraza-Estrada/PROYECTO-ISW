import { useState } from "react";
import { updateProductUsed } from "@services/productosUsados.service.js";
import { showSuccessAlert,showErrorAlert } from "@helpers/sweetAlert.js";
import { formatProductoUsadoData } from "@helpers/formatData.js";

const useEditProductosUsados = (setProductosUsados) => {
    const [isPopupProductosOpen, setIsPopupProductosOpen] = useState(false); 
    const [dataProducto, setDataProducto] = useState([]); 

    const handleClickUpdate = () => {
        if (dataProducto.length > 0) {
            setIsPopupProductosOpen(true); 
        }
    };

    const handleUpdate = async (updatedProductoData) => {
        if (updatedProductoData) {
            try {
                const updatedProducto = await updateProductUsed(
                    updatedProductoData,
                    dataProducto[0].idProducto,
                    //console.log("idProductoUsado", dataProducto[0].idProducto)
                ); 
                console.log("mensaje: ", updatedProducto.status);
                if (updatedProducto.status === "Client error") {
                    throw new Error(updatedProducto.message);
                }else{
                    showSuccessAlert(
                        "¡Actualizado!",
                        "El producto usado ha sido actualizado correctamente."
                    );
                }

                setIsPopupProductosOpen(false); 

                const formattedProducto = formatProductoUsadoData(updatedProducto);
                console.log("updatedProducto", updatedProducto);

                setProductosUsados((prevProductos) =>
                    prevProductos.map((producto) =>
                        producto.n_orden === formattedProducto.n_orden &&
                        producto.idProducto === formattedProducto.idProducto
                            ? formattedProducto
                            : producto
                    )
                );

                setDataProducto([]); 
            } catch (error) {
                console.error("Error al actualizar el producto usado:", error);
                showErrorAlert(
                    "Cancelado",
                    "Ocurrió un error al actualizar el producto usado."
                );
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupProductosOpen,
        setIsPopupProductosOpen,
        dataProducto,
        setDataProducto,
    };
};

export default useEditProductosUsados;
