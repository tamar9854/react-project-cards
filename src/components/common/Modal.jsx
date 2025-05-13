import { useContext } from "react";
import context from "../../context/Context";

function Modal({ message, onClose }) {
    const { color } = useContext(context)

    return (
        <div className={`modal`} tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog show">
                <div className={`modal-content ${color === 'dark' && 'bg-dark text-white'}`}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Error Message</h5>
                        <button type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose} >Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;