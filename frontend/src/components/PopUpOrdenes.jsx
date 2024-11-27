import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupOrd({ show, setShow, data, action }) {
  const ordenData = data || {}; // Asegúrate de tener un objeto por defecto
  const handleSubmit = (formData) => {
    // Filtra los datos enviados al backend
    const dataToSend = {
      n_orden: formData.n_orden,
      descripcion: formData.descripcion,
      estado: formData.estado,
      costo: formData.costo,
    };
    action(dataToSend);
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} />
            </button>
            <Form
              title="Editar Orden"
              fields={[
                {
                  label: "N° Orden",
                  name: "n_orden",
                  defaultValue: ordenData.n_orden || "",
                  fieldType: "input",
                  type: "text",
                  readOnly: true, // Campo bloqueado
                },
                {
                  label: "Descripción",
                  name: "descripcion",
                  defaultValue: ordenData.descripcion || "",
                  fieldType: "input",
                  type: "text",
                  required: true,
                  minLength: 5,
                  maxLength: 200,
                },
                {
                    label: "Estado",
                    name: "estado",
                    defaultValue: ordenData.estado || "",
                    fieldType: "select",
                    options: [
                        { label: "Pendiente", value: "pendiente" },
                        { label: "En Progreso", value: "en_progreso" },
                        { label: "Completado", value: "completado" },
                    ],
                    required: true,
                },
                {
                  label: "Costo",
                  name: "costo",
                  defaultValue: ordenData.costo || "",
                  fieldType: "input",
                  type: "number",
                  min: 0,
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
