import Table from '@components/Table';
import Search from '../components/Search';
import Popup from '../components/Popup';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/users.css';
import useEditUser from '@hooks/users/useEditUser';
import useOrdenes from '../hooks/ordenes/useGetOrdenes';

const Ordenes = () => {
  const { ordenes, setOrdenes } = useOrdenes();
  const [filterRut, setFilterRut] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataOrden,
    dataOrden
  } = useEditUser(setOrdenes);


  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const handleSelectionChange = useCallback((selectedOrden) => {
    setDataOrden(selectedOrden);
  }, [setDataOrden]);
/* 
*rut_Trabajor /(FK)
n° orden
nombreCliente
fono_cliente
email_cliente
descripcion
estado
costo
*/
  const columns = [
    { title: "Rut", field: "rut_Trabajador", width: 150, responsive: 2 },
    { title: "N° Orden", field: "n_orden", width: 70, responsive: 2 },
    { title: "Nombre Cliente", field: "nombreCliente", width: 150, responsive: 2 },
    { title: "Fono Cliente", field: "fono_cliente", width: 120, responsive: 2 },
    { title: "Email Cliente", field: "email_cliente", width: 200, responsive: 2 },
    { title: "Descripción", field: "descripcion", width: 300, responsive: 2 },
    { title: "Estado", field: "estado", width: 100, responsive: 2 },
    { title: "Costo", field: "costo", width: 100, responsive: 2 }
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Usuarios</h1>
          <div className='filter-actions'>
            <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
            <button onClick={handleClickUpdate} disabled={dataUser.length === 0}>
              {dataUser.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
          </div>
        </div>
        <Table
          data={ordenes}
          columns={columns}
          filter={filterRut}
          dataToFilter={'rut_Trabajador'}
          initialSortName={'nombreCompleto'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate} />
    </div>
  );
};

export default Ordenes;