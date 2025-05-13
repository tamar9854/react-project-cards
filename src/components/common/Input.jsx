

function Input({ label, fieldName, type, placeholder, error, ...rest }) {

    return (
        <div className="form-group required">
            <label htmlFor={fieldName}>{label}</label>
            <input {...rest} type={type} className="form-control" id={fieldName} placeholder={placeholder} />
            {error && <div role="alert" className="alert alert-danger"> {error}</div>}
        </div>
    )

}

export default Input;