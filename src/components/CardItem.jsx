
import cardService from "../services/cardService"
import { useContext } from "react";
import context from "../context/Context";
import { useNavigate } from "react-router-dom"
import "../style/carditem.css"

function CardItem({ card, deleteCard, onChange }) {
    const navigate = useNavigate();
    const { user } = useContext(context)

    const toggleLike = async () => {
        if (user._id != card.user_id) {
            const res = await cardService.toggleLike(card._id)
            onChange(res.data)
        }
    }
    const call = () => {

        window.location.href = "tel:" + card.phone
    }
    const editCard = () => {

        navigate(`/cards/${card._id}`)
    }
    const onDeleteCard = () => {
        if (user._id == card.user_id || user.isAdmin === true) {
            deleteCard(card._id)
        }

    }
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString("he-IL")
    }

    return (
        <div className=" col-md-4" onClick={() => navigate(`/card-details/${card._id}`)}>
            <div className={`card carditem border-dark `} >
                <img className="card-img-top" src={card.image.url} alt={card.image.alt} />
                <div className="card-body pt-0">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-subtitle">{card.subtitle}</p>
                    <hr className="m-0" />
                    <p className="mb-0"><strong>Phone:</strong>{card.phone}</p>
                    <p className="mb-0"><strong>Address:</strong>{card.address.street}</p>
                    <p className="mb-0"><strong>Card number:</strong>{card._id}</p>
                    <p className="mb-0"><small className="text-muted">created at {formatDate(card.createdAt)}</small></p>
                </div>
                <div className='card-footer '>
                    <div className='row'>
                        <div className="d-flex col-5 col-sm-4 justify-content-around">
                            {user && (user._id === card.user_id || user.isAdmin === true) && <i className="bi bi-trash-fill" onClick={onDeleteCard}></i>}
                            {user && user._id === card.user_id && <i className="bi bi-pencil-fill" onClick={editCard}></i>}
                        </div>
                        <div className="col-2 col-sm-4"></div>
                        <div className="d-flex col-5 col-sm-4 justify-content-around" >
                            <i className="bi bi-telephone-fill" onClick={call}></i>
                            {user && <i className='bi bi-heart-fill' style={{ color: card.likes.includes(user._id) ? 'red' : 'black' }} onClick={toggleLike}></i>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardItem