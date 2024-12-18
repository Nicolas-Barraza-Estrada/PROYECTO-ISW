import { useState, useEffect } from 'react';
import Form from './FormReserva';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';


export default function EditPopupReserva({ show, setShow, data, action }) {
    const [formData, setFormData] = useState({
        rut_usuario: '',
        nombre_cliente: '',
        email_cliente: '',
        fono_cliente: '',
        id_sesion: '',
        nombreSesion: '',
    });

    useEffect(() => {
        if (data && show && data.length > 0) {
            const item = data[0]; 
            setFormData({
                rut_usuario: item.rut_usuario || '',
                nombre_cliente: item.nombre_cliente || '',
                email_cliente: item.email_cliente || '',
                fono_cliente: item.fono_cliente || '',
                id_sesion: item.id_sesion || '',
                nombreSesion: item.nombreSesion || '',
            });
        }
    }, [data, show]);

    const handleChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
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
                            title="Editar Reserva"
                            fields={[
                                {
                                    label: "RUT Usuario",
                                    name: "rut_usuario",
                                    fieldType: "input",
                                    type: "text",
                                    value: formData.rut_usuario,
                                    readOnly: true,
                                },
                                {
                                    label: "Nombre del Cliente",
                                    name: "nombre_cliente",
                                    fieldType: "input",
                                    type: "text",
                                    value: formData.nombre_cliente,
                                    readOnly: true,
                                },
                                {
                                    label: "Correo Electrónico",
                                    name: "email_cliente",
                                    fieldType: "input",
                                    type: "email",
                                    value: formData.email_cliente,
                                    readOnly: true,
                                },
                                {
                                    label: "Teléfono",
                                    name: "fono_cliente",
                                    fieldType: "input",
                                    type: "tel",
                                    value: formData.fono_cliente,
                                    onChange: (value) => handleChange('fono_cliente', value),
                                    required: true,
                                },
                                {
                                    label: "Sesión Seleccionada",
                                    name: "nombreSesion",
                                    fieldType: "input",
                                    type: "text",
                                    value: formData.nombreSesion,
                                    readOnly: true,
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