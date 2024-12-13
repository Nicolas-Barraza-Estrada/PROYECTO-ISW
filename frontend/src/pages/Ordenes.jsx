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
const Ordenes = () => {
  const { ordenes, setOrdenes } = useOrdenes();
  const [filterRut, setFilterRut] = useState('');

  // Edit Ordenes Hook
  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOrdOpen,
    setIsPopupOrdOpen,
    dataOrden,
    setDataOrden,
  } = useEditOrdenes(setOrdenes);

  // Add Ordenes Hook
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
    { title: 'Descripción', field: 'descripcion', width: 300, responsive: 2 },
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
      {/* Edit Popup */}
      <PopupOrd
        show={isPopupOrdOpen}
        setShow={setIsPopupOrdOpen}
        data={dataOrden[0] || {}}
        action={handleUpdate}
      />
      {/* Add Popup */}
      <AddPopupOrd
        show={isAddPopupOpen}
        setShow={setIsAddPopupOpen}
        action={handleAddItem}
      />
    </div>
  );
};

export default Ordenes;
