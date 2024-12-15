import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import Table from '@components/Table';
import Search from '../components/Search';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/productosUsados.css';
import useEditOrdenes from '@hooks/ordenes/useEditOrdenes';
import useEditProductosUsados from '../hooks/productosUsados/useEditProductosUsados';
import useOrdenes from '../hooks/ordenes/useGetOrdenes';
import useProductosUsados from '../hooks/productosUsados/useGetProductosUsados';
import useAddOrdenes from '../hooks/ordenes/useAddOrdenes';
import AddPopupOrd from '../components/addPopUpOrd';
import PopupOrd from '../components/PopUpOrdenes';
import PopupProductos from '../components/PopUpProductosUsados';
import { useParams } from 'react-router-dom';   

const ProductosUsados = () => {
  const { n_orden } = useParams(); // Obtiene el n_orden desde la URL
  const { productosUsados, setProductosUsados } = useProductosUsados(n_orden);
  const [filterProducto, setFilterProducto] = useState("");

  // Edit Productos Usados Hook
  const {
    handleClickUpdate,
    handleUpdate,
    isPopupProductosOpen,
    setIsPopupProductosOpen,
    dataProducto,
    setDataProducto,
  } = useEditProductosUsados(setProductosUsados);

  const handleProductoFilterChange = (e) => {
    setFilterProducto(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedProducto) => {
      setDataProducto(selectedProducto);
    },
    [setDataProducto]
  );

  const columns = [
    { title: "N° Orden", field: "n_orden", width: 250, responsive: 5 },
    { title: "Producto", field: "nombre", width: 250, responsive: 5 },
    { title: "Cantidad", field: "cantidad", width: 250, responsive: 5 },
    { title: "Stock", field: "stock", width: 250, responsive: 5 },
  ];

  return (
    <div className="main-container">
          {/* Botón para volver a Ordenes */}
          <Link to="/ordenes">
            <button className="back-button">
              Volver a Órdenes
            </button>
          </Link>

      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Productos Usados por Orden {n_orden}</h1>
          


          <div className="filter-actions">
            <button
              onClick={handleClickUpdate}
              disabled={!dataProducto || dataProducto.length === 0}
            >
              {!dataProducto || dataProducto.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <Search
              value={filterProducto}
              onChange={handleProductoFilterChange}
              placeholder="Filtrar por producto"
            />
          </div>
        </div>

        {/* Verifica si no hay productos */}
        {productosUsados.length === 0 ? (
          <p>No hay productos disponibles para esta orden.</p>
        ) : (
          <Table
            data={productosUsados}
            columns={columns}
            filter={filterProducto}
            dataToFilter={"nombre"}
            initialSortName={"nombre"}
            onSelectionChange={handleSelectionChange}
          />
        )}
        
      </div>
      {/* Edit Popup */}
      <PopupProductos
        show={isPopupProductosOpen}
        setShow={setIsPopupProductosOpen}
        data={dataProducto[0] || {}}
        action={handleUpdate}
      />
    </div>
  );
};

export default ProductosUsados;
