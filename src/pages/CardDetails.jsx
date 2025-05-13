import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cardService from "../services/cardService";
import Spinner from "../components/common/Spinner";

function CardDetails() {
    const params = useParams();
    const [card, setCard] = useState(null)

    async function getidCard() {
        const res = await cardService.getCardbyId(params.cardId)
        setCard(res.data)
    }
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString("he-IL")
    }

    useEffect(() => {
        if (params.cardId) {
            getidCard()
        }
    }, [params])
    if (card === null) {
        return <Spinner />
    }
    return (
        <div className=" col-md-4">
            <div className={`card border-dark `} >
                <img className="card-img-top" src={card.image.url} alt={card.image.alt} />
                <div className="card-body pt-0">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-subtitle">{card.subtitle}</p>
                    <hr className="m-0" />
                    <p className="mb-0"><strong>Phone:</strong>{card.phone}</p>
                    <p className="mb-0"><strong>email:</strong>{card.email}</p>
                    <p className="mb-0"><strong> Country:</strong>{card.address.country}</p>
                    <p className="mb-0"><strong> State:</strong>{card.address.state}</p>
                    <p className="mb-0"><strong> Street Address:</strong>{card.address.street}</p>
                    <p className="mb-0"><strong> Zip Code:</strong>{card.address.zip}</p>
                    <p className="mb-0"><strong>Title:</strong>{card.title}</p>
                    <p className="mb-0"><strong>Subtitle:</strong>{card.subtitle}</p>
                    <p className="mb-0"><strong>Description:</strong>{card.description}</p>
                    <p className="mb-0"><strong>Card number:</strong>{card._id}</p>
                    <p className="mb-0"><strong>Biz Number:</strong>{card.bizNumber}</p>
                    <p className="mb-0"><strong>User id:</strong>{card.user_id}</p>
                    <p className="mb-0"><strong>Website:</strong>{card.web}</p>
                    <p className="mb-0"><small className="text-muted">created at {formatDate(card.createdAt)}</small></p>
                </div>
            </div>
        </div>
    )
}

export default CardDetails;