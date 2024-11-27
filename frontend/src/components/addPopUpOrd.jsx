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
                            title="Generar Nueva Orden"
                            fields={[
                                { name: 'rut_Trabajador', type: 'text', label: 'Rut Trabajador' },
                                { name: 'n_orden', type: 'text', label: 'N° Orden' },
                                { name: 'nombreCliente', type: 'text', label: 'Nombre Cliente' },
                                { name: 'fono_cliente', type: 'text', label: 'Fono Cliente' },
                                { name: 'email_cliente', type: 'email', label: 'Email Cliente' },
                                { name: 'descripcion', type: 'text', label: 'Descripción' },
                                { name: 'estado', type: 'text', label: 'Estado' },
                                { name: 'costo', type: 'number', label: 'Costo' }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Generar Orden"
                            backgroundColor="#fff"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}