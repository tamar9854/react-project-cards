import { useContext, useEffect, useState } from "react"
import context from "../context/Context";
import PageTitle from "../components/PageTitle";
import Spinner from "../components/common/Spinner";
import userService from "../services/userService";

function MyBusiness() {
    const [user, setUser] = useState(null)
    const { color, user: authUser } = useContext(context)

    const loadUser = async () => {
        const res = await userService.getUser(authUser._id)
        setUser(res.data);
    }
    useEffect(() => {
        if (authUser) {
            loadUser();
        }
    }, [authUser])

    if (!user) return (<Spinner />)

    return (
        <div className={`container ${color === "dark" ? "text-white" : "bg-body-tertiary"}`} >
            <PageTitle title="My Business" description="Here you can find details about me and my business" />
            <div>
                <p> {user.name.first + user.name.last}</p>
                <img className="w-50" src={user.image.url} alt={user.image.alt} />
                <p>{user.phone}</p>
                <hr />
                <h3>address</h3>
                <p>{user.address.street}</p>
                <p>{user.address.houseNumber}</p>
                <p>{user.address.city}</p>
                <p>{user.address.state}</p>
                <p>{user.address.country}</p>
                <p>{user.address.zip}</p>
            </div>
        </div>
    )
}

export default MyBusiness;