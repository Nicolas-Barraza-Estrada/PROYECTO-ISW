import Table from '@components/Table';
import Search from '../components/Search';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/ordenes.css';
import useEditOrdenes from '@hooks/ordenes/useEditOrdenes';
import useOrdenes from '../hooks/ordenes/useGetOrdenes';
import useAddOrdenes from '../hooks/ordenes/useAddOrdenes';
import AddPopupOrd from '../components/addPopUpOrd';
import PopupOrd from '../components/PopUpOrdenes';
import ViewIcon from '../assets/ViewIcon.svg';
import ViewIconDisabled from '../assets/ViewIconDisabled.svg';
import { useNavigate } from 'react-router-dom'; 

const Ordenes = () => {
  const { ordenes, setOrdenes } = useOrdenes();
  const [filterRut, setFilterRut] = useState('');
  const navigate = useNavigate(); 

  const handleRedirect = (n_orden) => {
    navigate(`/productosUsados/${n_orden}`); 
  };

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOrdOpen,
    setIsPopupOrdOpen,
    dataOrden,
    setDataOrden,
  } = useEditOrdenes(setOrdenes);

  const { handleClickAdd, handleAddItem, isAddPopupOpen, setIsAddPopupOpen } =
    useAddOrdenes(setOrdenes);

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedOrden) => {
      setDataOrden(selectedOrden);
      console.log("Datos seleccionados:", selectedOrden);    },
    [setDataOrden]
  );

  const columns = [
    { title: 'Rut Trabajador', field: 'rut_Trabajador', width: 150, responsive: 2 },
    { title: 'N° Orden', field: 'n_orden', width: 70, responsive: 2 },
    { title: 'Nombre Cliente', field: 'nombreCliente', width: 150, responsive: 2 },
    { title: 'Fono Cliente', field: 'fono_cliente', width: 120, responsive: 2 },
    { title: 'Email Cliente', field: 'email_cliente', width: 200, responsive: 2 },
    { title: 'Descripción', field: 'descripcion', width: 250, responsive: 2 },
    { title: 'Estado', field: 'estado', width: 100, responsive: 2 },
    { title: 'Costo', field: 'costo', width: 100, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Gestión de Órdenes de Trabajo</h1>
          <div className="filter-actions">
            <button
              onClick={handleClickUpdate}
              disabled={!dataOrden || dataOrden.length === 0}
            >
              {!dataOrden || dataOrden.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className="add-orden-button" onClick={handleClickAdd}>
              +
            </button>
            <button
              onClick={() => handleRedirect(dataOrden[0].n_orden)}
              disabled={!dataOrden || dataOrden.length === 0}
            >
              {!dataOrden || dataOrden.length === 0 ? (
                <img src={ViewIconDisabled} alt="edit-disabled" />
              ) : (
                <img src={ViewIcon} alt="edit" />
              )}
            </button>
            <Search
              value={filterRut}
              onChange={handleRutFilterChange}
              placeholder="Filtrar por n° orden"
            />
          </div>
        </div>
        <Table
          data={ordenes}
          columns={columns}
          filter={filterRut}
          dataToFilter={'n_orden'}
          initialSortName={'rut_Trabajador'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <PopupOrd
        show={isPopupOrdOpen}
        setShow={setIsPopupOrdOpen}
        data={dataOrden[0] || {}}
        action={handleUpdate}
      />
      <AddPopupOrd
        show={isAddPopupOpen}
        setShow={setIsAddPopupOpen}
        action={handleAddItem}
      />
    </div>
  );
};

export default Ordenes;
