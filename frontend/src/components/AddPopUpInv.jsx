import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function AddPopup({ show, setShow, action }) {
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
                            title="Agregar Nuevo Producto"
                            fields={[
                                {
                                    label: "Nombre Producto",
                                    name: "nombre",
                                    placeholder: "Nombre del producto",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                },
                                {
                                    label: "Stock",
                                    name: "stock",
                                    placeholder: "0",
                                    fieldType: "input",
                                    type: "number",
                                    required: true,
                                },
                                {
                                    label: "Precio",
                                    name: "precio",
                                    placeholder: "0",
                                    fieldType: "input",
                                    type: "number",
                                    required: true,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Agregar Producto"
                            backgroundColor="#fff"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
