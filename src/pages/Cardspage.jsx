import { useState, useEffect, useContext } from "react"
import Spinner from "../components/common/Spinner"
import PageTitle from "../components/PageTitle"
import context from "../context/Context"
import CardItem from "../components/CardItem"
import cardService from "../services/cardService"
import userService from "../services/userService"
import { useParams, useNavigate } from "react-router"
function Cardspage() {
    const { user } = useContext(context)
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [userDetails, setUserDetails] = useState(null)
    const params = useParams()
    const navigate = useNavigate();
    const loadCards = async () => {

        const res = await cardService.getAllCards()
        setCards(res.data)
        setLoading(false)
    }
    const filterCards = () => {
        if (params.search) {
            return cards.filter((card) => card.title.includes(params.search))
        } else {
            return cards
        }
    }

    const onChange = (updatedcard) => {
        const temp = [...cards]
        const index = temp.findIndex((card) => card._id == updatedcard._id)
        if (index > -1) {
            temp[index] = updatedcard
            setCards(temp)
        }
    }

    const deleteCard = (cardId) => {
        cardService.deleteCard(cardId);
        const tempCards = cards.filter(card => card._id != cardId);
        setCards(tempCards)
    }

    const getUserDetails = async () => {
        const response = await userService.getUser(user._id);
        if (response.status >= 400) {
            navigate("/signin")
        }

        setUserDetails(response.data)
    }

    useEffect(() => {
        loadCards()

    }, [])
    useEffect(() => {

        if (user) {


            getUserDetails()
        }
    }, [user])

    if (loading === true) {
        return <Spinner />
    }
    return (
        <div className="container" >
            <div>
                <PageTitle title="Cards Page" description="Here You can find all kinds of business cards" />
                {!params.search && userDetails && (<div>
                    <h3>{userDetails.name.first + " " + userDetails.name.last}</h3>
                </div>)}
            </div>
            <div className="row justify-content-center g-4">
                {
                    filterCards().slice(0, 50).map(card => <CardItem key={card._id} card={card} onChange={onChange} deleteCard={deleteCard} />)
                }
            </div>
        </div>

    )
}

export default Cardspage
