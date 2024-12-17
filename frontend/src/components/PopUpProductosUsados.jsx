import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopUpProductosUsados({ show, setShow, data, action }) {
  const productoData = data || {}; 
  const handleSubmit = (formData) => {

    const dataToSend = {
      n_orden: formData.n_orden,
      nombre: formData.nombre,
      idProducto: formData.idProducto,
      cantidad: formData.cantidad,
    };
    action(dataToSend); 
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <Form
              title="Agregar Producto Usado"
              fields={[
                {
                  label: "N° Orden",
                  name: "n_orden",
                  defaultValue: productoData.n_orden || "",
                  fieldType: "input",
                  type: "number",
                  readOnly: true, 
                },
                {
                  label: "Producto",
                  name: "nombre",
                  defaultValue: productoData.nombre || "",
                  fieldType: "input",
                  type: "text",
                  readOnly: true, 
                },
                {
                  label: "Cantidad",
                  name: "cantidad",
                  defaultValue: 1,
                  fieldType: "input",
                  type: "number",
                  min: 1,
                  required: true,
                },
              ]}
              onSubmit={handleSubmit}
              buttonText="Guardar Cambios"
              backgroundColor={'#fff'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
