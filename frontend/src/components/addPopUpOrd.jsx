import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function AddPopupOrd({ show, setShow, action }) {
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
                            title="Agregar Nueva Orden de Trabajo"
                            fields={[
                                {
                                    label: "Rut Trabajador",
                                    name: "rut_Trabajador",
                                    placeholder: "Ejemplo: 20.275.257-8",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    pattern: "^[0-9]+-[0-9kK]$",
                                },
                                {
                                    label: "Nombre Cliente",
                                    name: "nombreCliente",
                                    placeholder: "Nombre del cliente",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                },
                                {
                                    label: "Teléfono Cliente",
                                    name: "fono_cliente",
                                    placeholder: "Ejemplo: +56912345678",
                                    fieldType: "input",
                                    type: "tel",
                                    required: true,
                                    pattern: "^\\+?[0-9]+$",
                                },
                                {
                                    label: "Email Cliente",
                                    name: "email_cliente",
                                    placeholder: "cliente@ejemplo.cl",
                                    fieldType: "input",
                                    type: "email",
                                    required: true,
                                },
                                {
                                    label: "Descripción",
                                    name: "descripcion",
                                    placeholder: "Detalles del trabajo a realizar",
                                    fieldType: "textarea",
                                    required: true,
                                    minLength: 10,
                                    maxLength: 200,
                                },
                                {
                                    label: "Estado",
                                    name: "estado",
                                    fieldType: "select",
                                    options: [
                                        { label: "Pendiente", value: "pendiente" },
                                        { label: "En Progreso", value: "en_progreso" },
                                        { label: "Completado", value: "completado" },
                                    ],
                                    required: true,
                                }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Agregar Orden"
                            backgroundColor="#fff"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
