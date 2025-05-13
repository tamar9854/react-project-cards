import { useState, useEffect, useContext } from "react";
import context from '../context/Context'
import cardService from "../services/cardService";
import CardItem from "../components/CardItem";
import PageTitle from "../components/PageTitle";


function FavoriteCards() {
    const { user } = useContext(context)
    const [cards, setCards] = useState([])
    const loadCards = async () => {
        const res = await cardService.getAllCards()
        setCards(res.data.filter(card => card.likes.includes(user._id)))
    }

    useEffect(() => {
        loadCards()
    }, [])
    const deleteCard = (cardId) => {
        cardService.deleteCard(cardId);
        const tempCards = cards.filter(card => card.id != cardId);
        setCards(tempCards)
    }
    return (
        <div className="container">
            <PageTitle title="Favorite Cards Page" description="Here you can find all the cards you liked" />
            <div className="row">
                {
                    cards.map(card => <CardItem key={card._id} card={card} deleteCard={deleteCard} />)
                }
            </div>
        </div>

    )
}

export default FavoriteCards;