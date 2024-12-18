import Table from "@components/Table";
import Search from "../components/Search";
import PopupReserva from "../components/PopupReserva";
import AddPopupReserva from "../components/AddPopUpReserva.jsx";
import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import DeleteIcon from "../assets/deleteIcon.svg";
import DeleteIconDisable from "../assets/deleteIconDisabled.svg";
import { useCallback, useState } from "react";
import "@styles/reservas.css";
import useEditReserva from "@hooks/reservas/useEditReserva.jsx";
import useAddReserva from "@hooks/reservas/useAddReserva.jsx";
import useGetReservas from "@hooks/reservas/useGetReservas.jsx";
import useDeleteReserva from "@hooks/reservas/useDeleteReserva";

const Reservas = () => {
  const { reservas, fetchReservas, setReservas } = useGetReservas();
  const [filterEmail, setFilterEmail] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupReservaOpen,
    setIsPopupReservaOpen,
    dataReserva,
    setDataReserva
  } = useEditReserva(setReservas);

  const { handleClickAdd, handleAddReserva, isAddPopupOpen, setIsAddPopupOpen } =
    useAddReserva(setReservas);

  const { handleDelete } = useDeleteReserva(fetchReservas, setReservas);

  const handleEmailFilterChange = (e) => {
    setFilterEmail(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedReserva) => {
      setDataReserva(selectedReserva);
    },
    [setDataReserva]
  );

  const handleDeleteReserva = () => {
    handleDelete(dataReserva);
  };

  const columns = [
    { title: "Nombre del Cliente", field: "nombre_cliente", width: 300, responsive: 0 },
    { title: "Correo Electrónico", field: "email_cliente", width: 300, responsive: 1 },
    { title: "Teléfono", field: "fono_cliente", width: 200, responsive: 2 },
    { title: "Rut Usuario", field: "rut_usuario", width: 200, responsive: 2 },
    { title: "Nombre Sesión", field: "nombreSesion", width: 150, responsive: 3 }
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Reservas</h1>
          <div className="filter-actions">
            <button
              onClick={handleClickUpdate}
              disabled={dataReserva.length === 0}
            >
              {dataReserva.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button
              className="delete-reserva-button"
              onClick={handleDeleteReserva}
              disabled={dataReserva.length === 0}
            >
              {dataReserva.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>

            <button className="add-reserva-button" onClick={handleClickAdd}>
              +
            </button>
            <Search
              value={filterEmail}
              onChange={handleEmailFilterChange}
              placeholder="Filtrar por email"
            />
          </div>
        </div>

        <Table
          data={reservas}
          columns={columns}
          filter={filterEmail}
          dataToFilter={"email_cliente"}
          initialSortName={"nombre_cliente"}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <PopupReserva
        show={isPopupReservaOpen}
        setShow={setIsPopupReservaOpen}
        data={dataReserva}
        action={handleUpdate}
      />

      <AddPopupReserva
        show={isAddPopupOpen}
        setShow={setIsAddPopupOpen}
        action={handleAddReserva}
      />
    </div>
  );
};

export default Reservas;