import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function AddPopupSesion({ show, setShow, action }) {
    const handleSubmit = (formData) => {
        action(formData);
        setShow(false);
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
                            title="Agregar Nueva Sesión"
                            fields={[
                                {
                                    label: "Nombre de la Sesión",
                                    name: "nombreSesion",
                                    placeholder: "Nombre de la sesión",
                                    fieldType: "input",
                                    type: "string",
                                    required: true,
                                },
                                {
                                    label: "Fecha",
                                    name: "fecha",
                                    placeholder: "DD-MM-YYYY",
                                    fieldType: "input",
                                    type: "string",
                                    required: true,
                                },
                                {
                                    label: "Disponibilidad",
                                    name: "disponibilidad",
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
                            buttonText="Agregar Sesión"
                            backgroundColor="#fff"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
