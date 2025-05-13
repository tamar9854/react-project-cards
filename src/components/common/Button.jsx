
function Button({ type, value, disabled = false, onClick }) {

    return (
        <button type={type} className="form-control btn btn-primary" disabled={disabled} onClick={onClick}>{value}</button>
    )
}

export default Button