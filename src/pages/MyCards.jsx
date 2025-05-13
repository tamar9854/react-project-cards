import { useState, useEffect, useContext } from "react";
import context from '../context/Context'
import cardService from "../services/cardService";
import CardItem from "../components/CardItem";


function MyCards() {
    const { user } = useContext(context)
    const [cards, setCards] = useState([])
    const loadCards = async () => {
        const res = await cardService.getAllmycards()
        setCards(res.data)
    }

    useEffect(() => {
        loadCards()
    }, [])
    const deleteCard = (cardId) => {
        cardService.deleteCard(cardId);
        const tempCards = cards.filter(card => card._id != cardId);
        setCards(tempCards)
    }
    return (
        <div className="container">
            <div className="row ">
                {
                    cards.map(card => <CardItem key={card._id} card={card} deleteCard={deleteCard} />)
                }
            </div>
        </div>

    )
}

export default MyCards;