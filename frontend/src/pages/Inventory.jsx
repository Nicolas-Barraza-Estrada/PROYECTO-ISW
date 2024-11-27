import Table from "@components/Table";
import useInventory from "@hooks/Inventory/useGetInventory.jsx";
import Search from "../components/Search";
import PopupInv from "../components/PopupInventario";
import AddPopupInv from "../components/AddPopUpInv.jsx";
import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import { useCallback, useState } from "react";
import "@styles/inventory.css";
import useEditInventory from "@hooks/Inventory/useEditInventory.jsx";
import useAddInventory from "@hooks/Inventory/useAddInventory.jsx";

const Inventory = () => {
  const { inventory, setInventory } = useInventory();
  const [filterId, setFilterId] = useState("");

  // Edit Inventory Hook
  const {
    handleClickUpdate,
    handleUpdate,
    isPopupInvOpen,
    setIsPopupInvOpen,
    dataInventory,
    setDataInventory,
  } = useEditInventory(setInventory);

  // Add Inventory Hook
  const { handleClickAdd, handleAddItem, isAddPopupOpen, setIsAddPopupOpen } =
    useAddInventory(setInventory);

  const handleIdFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedInventory) => {
      setDataInventory(selectedInventory);
    },
    [setDataInventory]
  );

  const columns = [
    { title: "ID", field: "idProducto", width: 100, responsive: 2 },
    { title: "Nombre", field: "nombre", width: 350, responsive: 0 },
    { title: "Stock", field: "stock", width: 100, responsive: 3 },
    { title: "Precio", field: "precio", width: 150, responsive: 3 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 },
    { title: "Last Update", field: "updatedAt", width: 200, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Inventory</h1>
          <div className="filter-actions">
            <button
              onClick={handleClickUpdate}
              disabled={dataInventory.length === 0}
            >
              {dataInventory.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className="add-inventory-button" onClick={handleClickAdd}>
              +
            </button>
            <Search
              value={filterId}
              onChange={handleIdFilterChange}
              placeholder="Filtrar por id"
            />
          </div>
        </div>

        <Table
          data={inventory}
          columns={columns}
          filter={filterId}
          dataToFilter={"idProducto"}
          initialSortName={"nombre"}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      {/* Edit Popup */}
      <PopupInv
        show={isPopupInvOpen}
        setShow={setIsPopupInvOpen}
        data={dataInventory}
        action={handleUpdate}
      />

      {/* Add Popup */}
      <AddPopupInv
        show={isAddPopupOpen}
        setShow={setIsAddPopupOpen}
        action={handleAddItem}
      />
    </div>
  );
};

export default Inventory;
