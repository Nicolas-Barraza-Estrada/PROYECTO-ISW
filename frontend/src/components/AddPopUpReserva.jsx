import { useState, useEffect } from 'react';
import Form from './FormReserva';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { getUsers } from '@services/user.service';
import { getSesiones } from '@services/sesion.service';

export default function AddPopupReserva({ show, setShow, action }) {
    const [ruts, setRuts] = useState([]); 
    const [sesiones, setSesiones] = useState([]); 
    const [formData, setFormData] = useState({
        nombre_cliente: '',
        email_cliente: '',
        fono_cliente: '',
        rut_usuario: '',
        id_sesion: '', 
        nombreSesion: '', 
    });

    useEffect(() => {
        const fetchData = async () => {
            if (show) {
                try {
                    const usersData = await getUsers();
                    setRuts(usersData);

                    const sesionesData = await getSesiones();
                    const sesionesDisponibles = sesionesData.filter((sesion) => sesion.disponibilidad === 'Disponible');
                    setSesiones(sesionesDisponibles);
                } catch (error) {
                    console.error('Error al cargar los datos:', error);
                }
            }
        };

        fetchData();
    }, [show]);

    const handleRutChange = (rut) => {
        const selectedUser = ruts.find((item) => item.rut === rut);
        if (selectedUser) {
            setFormData({
                ...formData,
                rut_usuario: selectedUser.rut,
                nombre_cliente: selectedUser.nombreCompleto,
                email_cliente: selectedUser.email,
            });
        }
    };

    const handleSesionChange = (nombreSesion) => {
        const selectedSesion = sesiones.find((sesion) => sesion.nombreSesion === nombreSesion);
        if (selectedSesion) {
            setFormData({
                ...formData,
                id_sesion: selectedSesion.id_sesion,
                nombreSesion: selectedSesion.nombreSesion,
            });
        }
    };

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
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
                            title="Agregar Nueva Reserva"
                            fields={[
                                {
                                    label: "RUT Usuario",
                                    fieldType: "select",
                                    options: ruts.map((rutData) => ({
                                        label: rutData.rut,
                                        value: rutData.rut,
                                    })),
                                    onChange: handleRutChange,
                                },
                                {
                                    label: "RUT Seleccionado",
                                    name: "rut_usuario",
                                    fieldType: "input",
                                    type: "text",
                                    value: formData.rut_usuario,
                                    readOnly: true,
                                    required: true,
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
                                    placeholder: "Ej. +56912345678",
                                    value: formData.fono_cliente,
                                    onChange: (value) => handleChange("fono_cliente", value),
                                    required: true,
                                },
                                {
                                    label: "Nombre de la Sesión",
                                    fieldType: "select",
                                    options: sesiones.map((sesion) => ({
                                        label: sesion.nombreSesion,
                                        value: sesion.nombreSesion,
                                    })),
                                    onChange: handleSesionChange,
                                },
                                {
                                    label: "Sesión Seleccionada",
                                    name: "nombreSesion",
                                    fieldType: "input",
                                    type: "text",
                                    value: formData.nombreSesion,
                                    readOnly: true,
                                    required: true,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Agregar Reserva"
                            backgroundColor="#fff"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
