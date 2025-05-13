const FieldCol = ({ fieldName, type, placeholder, label, error, ...rest }) => {

    return (
        <div className={"col-12 col-sm-6 pb-2 form-group"}>
            <input type={type} className={type == "checkbox" ? "form-check-input" : "form-control"} placeholder={placeholder} id={fieldName} {...rest} />
            {type == "checkbox" && <label className="form-check-label">{label}</label>}
            <small style={{ fontSize: "0.7rem", color: "red", }}> {error || " "}</small>
        </div>
    )
}

export default FieldCol