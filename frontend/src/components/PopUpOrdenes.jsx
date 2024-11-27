import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
export default function PopupOrd({ show, setShow, data, action }) {
    const inventoryData = data && data.length > 0 ? data[0] : {};
    const handleSubmit = (formData) => {
        action(formData);
    };
    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Editar Orden"
                        fields={[
                            { name: 'rut_Trabajador', type: 'text', label: 'Rut Trabajador', value: inventoryData.rut_Trabajador },
                            { name: 'n_orden', type: 'text', label: 'N° Orden', value: inventoryData.n_orden },
                            { name: 'nombreCliente', type: 'text', label: 'Nombre Cliente', value: inventoryData.nombreCliente },
                            { name: 'fono_cliente', type: 'text', label: 'Fono Cliente', value: inventoryData.fono_cliente },
                            { name: 'email_cliente', type: 'email', label: 'Email Cliente', value: inventoryData.email_cliente },
                            { name: 'descripcion', type: 'text', label: 'Descripción', value: inventoryData.descripcion },
                            { name: 'estado', type: 'text', label: 'Estado', value: inventoryData.estado },
                            { name: 'costo', type: 'number', label: 'Costo', value: inventoryData.costo }
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Editar Orden"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}