import { createContext, useState, useEffect } from "react";
import userService from "../services/userService";

const context = createContext(
    {
        color: 'dark',
        light: () => { },
        dark: () => { },
        isLoggedin: false,
        logout: () => { },
        login: ({ _id: '', isBusiness: true, isAdmin: false }),
        user: { _id: '', isBusiness: true, isAdmin: false }
    })


export const ContextProvider = ({ children }) => {
    const [color, setColor] = useState("dark")
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userService.getToken()) {
            const user = userService.getTokenData();
            login(user)
        }

    }, [])
    const login = (user) => {
        setIsLoggedin(true)
        setUser(user);
    }
    const logout = () => {
        setIsLoggedin(false)
        setUser(null)
    }
    const dark = () => {
        setColor("dark")
    }
    const light = () => {
        setColor("light")
    }
    return (
        <context.Provider value={{ color, light, dark, isLoggedin, logout, login, user }}>
            {children}
        </context.Provider>
    )
}



export default context

