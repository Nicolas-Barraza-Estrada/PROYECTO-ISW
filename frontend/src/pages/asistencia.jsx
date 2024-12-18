import Table from "@components/Table";
import Search from "../components/Search";
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import AddPopupAsistencia from "../components/AddPopupAsistencia";
import EditPopupAsistencia from "../components/EditPopupAsistencia";
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import { useCallback, useEffect, useState } from "react";
import "@styles/asistencia.css";
import useGetAsistencia from "../hooks/asistencia/useGetAsistencia.jsx";
import useAddAsistencia from "../hooks/asistencia/useAddAsistencia.jsx";
import useEditAsistencia from "../hooks/asistencia/useEditAsistencia.jsx";
import useDeleteAsistencia from "../hooks/asistencia/useDeleteAsistencia.jsx";

const Asistencia = () => {
  const { asistencia, fetchAsistencia,setAsistencia } = useGetAsistencia();
  const [filterRut, setFilterRut] = useState('');

  // Editar asistencia
  const {handleClickUpdate,handleUpdate,isPopupAsistenciaOpen,setIsPopupAsisOpen,dataAsistencia,setDataAsistencia
  } = useEditAsistencia(fetchAsistencia,setAsistencia);

  const { handleDelete } = useDeleteAsistencia(fetchAsistencia, setDataAsistencia);

  // Agregar asistencia
  const { handleClickAdd, handleAddItem, isAddPopupOpen, setIsAddPopupOpen } =
    useAddAsistencia(fetchAsistencia, setAsistencia);

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selected) => {
      setDataAsistencia(selected);
    },
    [setDataAsistencia]
  );

  const columns = [
    { title: "ID Usuario", field: "idUsuario", width: 150, responsive: 2 },
    { title: "Fecha", field: "fecha", width: 150, responsive: 3 },
    { title: "Hora Entrada", field: "horaEntrada", width: 150, responsive: 3 },
    { title: "Hora Salida", field: "horaSalida", width: 150, responsive: 3 },
  ];

  useEffect(() => {
    console.log("Datos actuales de asistencia:", asistencia);
  }, [asistencia]); 

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Asistencias</h1>
          <div className="filter-actions">
            {/* Botón para editar */}
            <button
              onClick={handleClickUpdate}
              disabled={dataAsistencia.length === 0}
            >
              {dataAsistencia.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
  
            <button
                className="delete-asistencia-button"
                disabled={dataAsistencia.length === 0}
                onClick={() => handleDelete(dataAsistencia)} // Pasar solo el ID
              >
                {dataAsistencia.length === 0 ? (
                  <img src={DeleteIconDisable} alt="delete-disabled" />
                ) : (
                  <img src={DeleteIcon} alt="delete" />
                )}
            </button>

  
            {/* Botón para agregar */}
            <button
              className="add-asistencia-button"
              onClick={handleClickAdd}
            >
              +
            </button>
  
            {/* Campo de búsqueda */}
            <Search
              value={filterRut}
              onChange={handleRutFilterChange}
              placeholder="Filtrar por RUT"
            />
          </div>
        </div>
  
        {/* Tabla de asistencias */}
        <Table
          data={asistencia}
          columns={columns}
          filter={filterRut}
          dataToFilter={"idUsuario"}
          initialSortName={"fecha"}
          onSelectionChange={handleSelectionChange}
        />
      </div>
  
      {/* Popup Editar */}
      <EditPopupAsistencia
        show={isPopupAsistenciaOpen}
        setShow={setIsPopupAsisOpen}
        data={dataAsistencia}
        action={handleUpdate}
      />
  
      {/* Popup Agregar */}
      <AddPopupAsistencia
        show={isAddPopupOpen}
        setShow={setIsAddPopupOpen}
        action={handleAddItem}
      />
    </div>
  );
  
};

export default Asistencia;
