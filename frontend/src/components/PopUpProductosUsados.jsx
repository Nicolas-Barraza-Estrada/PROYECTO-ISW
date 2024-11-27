import { useState, useEffect } from 'react';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { getProductsUsed, updateProductUsed, addProductUsed } from '@services/productos'; // Asegúrate de tener estos servicios

const PopupProductosUsados = ({ show, setShow, nOrden, action }) => {
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({ idProducto: '', cantidad: '' });

  // Función para obtener productos usados
  const fetchProductos = async () => {
    const response = await getProductsUsed(nOrden);
    setProductos(response.data); // Asumiendo que el backend devuelve los productos en 'data'
  };

  useEffect(() => {
    if (nOrden) {
      fetchProductos();
    }
  }, [nOrden]);

  const handleUpdateProduct = async (productId, newQuantity) => {
    await updateProductUsed(nOrden, productId, newQuantity);
    fetchProductos(); // Actualiza la lista después de la modificación
  };

  const handleAddProduct = async () => {
    await addProductUsed(nOrden, newProduct.idProducto, newProduct.cantidad);
    fetchProductos(); // Actualiza la lista después de agregar el producto
    setNewProduct({ idProducto: '', cantidad: '' }); // Limpiar el formulario de agregar producto
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <h2>Gestionar Productos Usados</h2>

            {/* Lista de productos usados */}
            <div>
              {productos.map(producto => (
                <div key={producto.idProducto}>
                  <p>{producto.nombreProducto} - Cantidad: {producto.cantidad}</p>
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => handleUpdateProduct(producto.idProducto, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Agregar nuevo producto */}
            <div>
              <input
                type="text"
                placeholder="ID Producto"
                value={newProduct.idProducto}
                onChange={(e) => setNewProduct({ ...newProduct, idProducto: e.target.value })}
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={newProduct.cantidad}
                onChange={(e) => setNewProduct({ ...newProduct, cantidad: e.target.value })}
              />
              <button onClick={handleAddProduct}>Agregar Producto</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Asegúrate de exportar correctamente el componente
export default PopupProductosUsados;
