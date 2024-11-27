import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function AddPopupAsistencia({ show, setShow, action }) {
    const handleSubmit = (formData) => {
        action(formData);
        setShow(false); // Cierra el popup después de enviar el formulario
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
                            title="Agregar Nueva Asistencia"
                            fields={[
                                {
                                    label: "Fecha",
                                    name: "fecha",
                                    placeholder: "dd/mm/yyyy",
                                    fieldType: "input",
                                    type: "date",
                                    required: true,
                                },
                                {
                                    label: "Hora de Entrada",
                                    name: "hora_entrada",
                                    placeholder: "HH:mm",
                                    fieldType: "input",
                                    type: "time",
                                    required: true,
                                },
                                {
                                    label: "Hora de Salida",
                                    name: "hora_salida",
                                    placeholder: "HH:mm",
                                    fieldType: "input",
                                    type: "time",
                                    required: true,
                                },
                                {
                                    label: "ID del Usuario",
                                    name: "usuarioId",
                                    placeholder: "Ej: 10",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 1,
                                    maxLength: 3,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Agregar Asistencia"
                            backgroundColor="#fff"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
