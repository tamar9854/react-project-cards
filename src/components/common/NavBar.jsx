import { useContext } from 'react'
import { NavLink } from "react-router-dom";
import context from '../../context/Context'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const [search, setSearch] = useState("")
    const { user, color, dark, light, isLoggedin, logout } = useContext(context)
    const navigate = useNavigate()

    const handleClick = () => {
        if (search == "") {
            return
        } else {
            navigate("/search/" + search)

        }
    }

    return (
        <div >
            <nav className={`navbar navbar-expand-md position-relative ${color === "dark" ? "navbar-dark bg-dark" : "bg-body-tertiary"}`}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarMenuToggler" aria-controls="navbarMenuToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex align-items-center">
                        <NavLink className="navbar-brand active" to="/">Home</NavLink>
                    </div>
                    <div style={{ zIndex: 1000 }} className={`position-md-static collapse navbar-collapse position-absolute top-100 start-0 w-100 ${color === "dark" ? "navbar-dark bg-dark" : "bg-body-tertiary"}`} id="navbarMenuToggler">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">

                            {isLoggedin ?
                                <>
                                    <li className="nav-item nav-link" onClick={logout}>Signout</li>
                                    <li className="nav-item"><NavLink className="nav-link " to="/my-cards">My Cards</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link " to="/create-card">Create Card</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link " to="/my-favorites">My Favorites</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link " to="/my-business">My Business</NavLink></li>
                                    {user.isAdmin === true && <li className="nav-item"><NavLink className="nav-link " to="/userslist">Users list</NavLink></li>}

                                </>
                                :
                                <>
                                    <li className="nav-item"><NavLink className="nav-link" to="/signin">Signin</NavLink></li>
                                    <li className="nav-item"> <NavLink className="nav-link" to="/signup">Signup</NavLink></li>
                                </>
                            }
                        </ul>

                        <span style={{ cursor: 'pointer' }} className="navbar-brand" onClick={() => color === 'dark' ? light() : dark()}>  <i className={`bi bi-moon${color === 'dark' ? '' : '-fill'}`}></i> </span>
                        {isLoggedin && <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="btn btn-outline-success" type="button" onClick={handleClick}>Search</button>
                        </form>}
                    </div>
                </div>
            </nav >

        </div >
    )
}
export default NavBar;