import { useContext } from 'react';
import { NavLink } from "react-router-dom";
import context from '../../context/Context'
import "../../style/footer.css";
import { FcAbout } from "react-icons/fc";
import { MdFavorite } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";

const menuArr = [
    { role: '*', text: "About", to: "/about", icon: <FcAbout /> },
    { role: 'isBusiness', text: "Favorites", to: "/favorites", icon: <MdFavorite /> },
    { role: 'isBusiness', text: "My Cards", to: "/my-cards", icon: <FaAddressCard /> },
]
function Footer() {
    const { color, isLoggedin, user } = useContext(context)
    const isBusiness = user?.isBusiness;
    const isAdmin = user?.isAdmin;
    const filterMenu = () => {
        return menuArr.filter(menuItem => {
            if (isAdmin === true) return true;
            if (menuItem.role == '*') {
                return true;
            }
            if (menuItem.role === 'isBusiness') {
                if (isBusiness == true)
                    return true;
                else
                    return false
            }
            return true;
        })
    }
    return (

        <nav className={`v-10 navbar fixed-bottom ${color === "dark" ? "navbar-dark bg-dark" : "bg-body-tertiary"} footer-shadow`}>
            < div className="container-fluid justify-content-center">
                {
                    filterMenu().map(menuItem => <NavLink key={menuItem.text} className="navbar-brand nav-item" to={menuItem.to}>{menuItem.icon} <span className="menu-text">{menuItem.text}</span></NavLink>)
                }

            </div>
        </nav>
    )

}

export default Footer