import React, { useState } from "react";
import '@styles/productosUsados.css'; // Reutiliza los mismos estilos de popup
import CloseIcon from '@assets/XIcon.svg';

const AddPopupProductos = ({ show, setShow, productos, selectedProducto, setSelectedProducto, onAdd }) => {
    const [cantidad, setCantidad] = useState(1);

    const handleProductoChange = (e) => {
        const productoId = parseInt(e.target.value);
        const producto = productos.find((p) => p.idProducto === productoId);
        setSelectedProducto(producto);
    };

    const handleAddClick = () => {
        onAdd(cantidad);
        setCantidad(1); // Reinicia la cantidad
        setShow(false); // Cierra el popup
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        show && (
            <div className="bg"> {/* Fondo oscuro semitransparente */}
                <div className="popup"> {/* Contenedor del popup centrado */}
                    <button className="close" onClick={handleClose}>
                        <img src={CloseIcon} alt="Close" />
                    </button>
                    <h2>Agregar Producto a una Orden de trabajo</h2>
                    <div>
                        <label>Seleccionar Producto:</label>
                        <select onChange={handleProductoChange} value={selectedProducto?.idProducto || ""}>
                            <option value="" disabled>Selecciona un producto</option>
                            {productos.map((producto) => (
                                <option key={producto.idProducto} value={producto.idProducto}>
                                    {producto.nombre} (Stock: {producto.stock})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Cantidad:</label>
                        <input
                            type="number"
                            min="1"
                            value={cantidad}
                            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value)))}
                        />
                    </div>
                    <div className="popup-actions">
                        <button onClick={handleAddClick}>Agregar</button>
                        <button onClick={handleClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default AddPopupProductos;
