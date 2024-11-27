import Table from "@components/Table";
import Search from "../components/Search";
import PopupSesion from "../components/PopupSesion";
import AddPopupSesion from "../components/AddPopUpSesion.jsx";
import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import DeleteIcon from "../assets/deleteIcon.svg";
import DeleteIconDisable from "../assets/deleteIconDisabled.svg";
import { useCallback, useState } from "react";
import "@styles/sesion.css";
import useEditSesion from "../hooks/sesion/useEditSesion.jsx";
import useAddSesion from "../hooks/sesion/useAddSesion.jsx";
import useGetSesion from "../hooks/sesion/useGetSesiones.jsx";
import useDeleteSesion from "../hooks/sesion/useDeleteSesion"; // Hook para eliminar sesión

const Sesion = () => {
  const { sesiones, fetchSesiones, setSesiones } = useGetSesion();
  const [filterId, setFilterId] = useState("");

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupSesionOpen,
    setIsPopupSesionOpen,
    dataSesion,
    setDataSesion,
  } = useEditSesion(setSesiones);

  const { handleClickAdd, handleAddSesion, isAddPopupOpen, setIsAddPopupOpen } =
    useAddSesion(setSesiones);

  const { handleDelete } = useDeleteSesion(fetchSesiones, setSesiones);

  const handleIdFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedSesion) => {
      setDataSesion(selectedSesion);
    },
    [setDataSesion]
  );

  const handleDeleteSesion = () => {
    handleDelete(dataSesion); 
  };

  const columns = [
    { title: "ID", field: "id_sesion", width: 200, responsive: 2 },
    { title: "Disponibilidad", field: "disponibilidad", width: 150, responsive: 0 },
    { title: "Fecha", field: "fecha", width: 200, responsive: 3 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 },
    { title: "Last Update", field: "updatedAt", width: 200, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Sesiones</h1>
          <div className="filter-actions">
            <button
              onClick={handleClickUpdate}
              disabled={dataSesion.length === 0}
            >
              {dataSesion.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button
              className="delete-sesion-button"
              onClick={handleDeleteSesion}
              disabled={dataSesion.length === 0}
            >
              {dataSesion.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>

            <button className="add-sesion-button" onClick={handleClickAdd}>
              +
            </button>
            <Search
              value={filterId}
              onChange={handleIdFilterChange}
              placeholder="Filtrar por ID"
            />
          </div>
        </div>

        <Table
          data={sesiones}
          columns={columns}
          filter={filterId}
          dataToFilter={"id_sesion"}
          initialSortName={"fecha"}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <PopupSesion
        show={isPopupSesionOpen}
        setShow={setIsPopupSesionOpen}
        data={dataSesion}
        action={handleUpdate}
      />

      <AddPopupSesion
        show={isAddPopupOpen}
        setShow={setIsAddPopupOpen}
        action={handleAddSesion}
      />
    </div>
  );
};

export default Sesion;