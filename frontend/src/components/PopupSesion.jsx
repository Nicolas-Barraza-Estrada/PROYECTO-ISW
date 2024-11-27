import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupSesion({ show, setShow, data, action }) {
    const sesionData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Close" />
                        </button>
                        <Form
                            title="Editar Sesión"
                            fields={[
                                {
                                    label: "Fecha",
                                    name: "fecha",
                                    defaultValue: sesionData.fecha || "",
                                    placeholder: "DD-MM-YYYY",
                                    fieldType: "input",
                                    type: "string",
                                    required: true,
                                },
                                {
                                    label: "Disponibilidad",
                                    name: "disponibilidad",
                                    defaultValue: sesionData.disponibilidad || "",
                                    placeholder: "true/false",
                                    fieldType: "select",
                                    options: [
                                        { label: "Disponible", value: true },
                                        { label: "No disponible", value: false },
                                    ],
                                    required: true,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Guardar Cambios"
                            backgroundColor="#fff"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}