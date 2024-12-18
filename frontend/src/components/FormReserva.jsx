export default function Form({ title, fields, onSubmit, buttonText, backgroundColor }) {
    const handleChange = (e, field) => {
        const value = e.target.value;
        if (field.onChange) {
            field.onChange(value); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = fields.reduce((acc, field) => {
            acc[field.name] = field.value || ''; 
            return acc;
        }, {});
        onSubmit(data); 
    };

    return (
        <form className="form" style={{ backgroundColor }} onSubmit={handleSubmit}>
            <h2>{title}</h2>
            {fields.map((field, index) => (
                <div className="form-group" key={index}>
                    <label>{field.label}</label>
                    {field.fieldType === 'input' && (
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={field.value || ''} 
                            onChange={(e) => handleChange(e, field)} 
                            readOnly={field.readOnly || false} 
                            required={field.required || false}
                        />
                    )}
                    {field.fieldType === 'select' && (
                        <select
                            name={field.name}
                            value={field.value || ''}
                            onChange={(e) => handleChange(e, field)}
                            required={field.required || false}
                        >
                            <option value="">Seleccionar</option>
                            {field.options.map((option, idx) => (
                                <option key={idx} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ))}
            <button type="submit" className="submit-button">
                {buttonText}
            </button>
        </form>
    );
}