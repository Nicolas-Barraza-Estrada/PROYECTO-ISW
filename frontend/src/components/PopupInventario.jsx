import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupInv({ show, setShow, data, action }) {
    const inventoryData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
    };

    const patternPrecio = /^[1-9]\d*$/;
    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Editar Producto"
                        fields={[
                            {
                                label: "Nombre Producto",
                                name: "nombre",
                                defaultValue: inventoryData.nombre || "",
                                placeholder: 'Placeholder Product',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                minLength: 3,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                            {
                                label: "Stock",
                                name: "stock",
                                defaultValue: inventoryData.stock || "",
                                placeholder: '5',
                                fieldType: 'input',
                                type: "number",
                                required: true
                            },
                            {
                                label: "Precio",
                                name: "precio",
                                defaultValue: inventoryData.precio || "",
                                placeholder: '999999999',
                                fieldType: 'input',
                                type: "number",
                                pattern: patternPrecio,
                                required: true,
                            },
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Editar usuario"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}