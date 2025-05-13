import { useContext } from "react"
import context from "../../context/Context"

function Spinner() {
    const { color } = useContext(context)
    return (
        <div className="container d-flex justify-content-center">
            {color === "dark" ? <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> :
                <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
        </div>
    )
}

export default Spinner