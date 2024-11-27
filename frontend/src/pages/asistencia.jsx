import Table from "@components/Table";
import Search from "../components/Search";
import AddPopupAsistencia from "../components/AddPopupAsistencia";
import EditPopupAsistencia from "../components/EditPopupAsistencia";
import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import { useCallback, useState } from "react";
import "@styles/asistencia.css";
import useGetAsistencia from "../hooks/asistencia/useGetAsistencia.jsx";
import useAddAsistencia from "../hooks/asistencia/useAddAsistencia.jsx";
import useEditAsistencia from "../hooks/asistencia/useEditAsistencia.jsx";

const Asistencia = () => {
  const { asistencia, setAsistencia } = useGetAsistencia();
  const [filterRut, setFilterRut] = useState('');

  // Editar asistencia
  const {
    handleClickUpdate,
    handleUpdate,
    isPopupAsistenciaOpen,
    setIsPopupAsisOpen,
    dataAsistencia,
    setDataAsistencia
  } = useEditAsistencia(setAsistencia);

  // Agregar asistencia
  const { handleClickAdd, handleAddItem, isAddPopupOpen, setIsAddPopupOpen } =
    useAddAsistencia(setAsistencia);

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
    { title: "ID Asistencia", field: "id_asistencia", width: 100, responsive: 2 },
    { title: "ID Usuario", field: "usuarioId", width: 200, responsive: 2 },
    { title: "Fecha", field: "fecha", width: 150, responsive: 3 },
    { title: "Hora Entrada", field: "horaEntrada", width: 150, responsive: 3 },
    { title: "Hora Salida", field: "horaSalida", width: 150, responsive: 3 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Asistencias</h1>
          <div className="filter-actions">
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
              className="add-asistencia-button"
              onClick={handleClickAdd}
            >
              +
            </button>
            <Search
              value={filterRut}
              onChange={handleRutFilterChange}
              placeholder="Filtrar por RUT"
            />
          </div>
        </div>

        <Table
          data={asistencia}
          columns={columns}
          filter={filterRut}
          dataToFilter={"usuarioId"}
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
