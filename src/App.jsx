import { Routes, Route, Navigate } from "react-router"
import { useContext } from "react"
import context from "./context/Context"
import NavBar from "./components/common/NavBar"
import Signin from "./pages/Signin"
import Footer from "./components/common/Footer"
import Signup from "./pages/Signup"
import Createcard from "./pages/Createcard"
import MyCards from "./pages/MyCards"
import EditCard from "./pages/EditCard"
import Cardspage from "./pages/Cardspage"
import FavoriteCards from "./pages/FavoriteCards";
import UserList from "./pages/UserList";
import About from "./pages/About";
import MyBusiness from "./pages/MyBusiness";

import './style/general.css'
import CardDetails from "./pages/CardDetails"

function App() {
  const { user, color } = useContext(context)


  return (


    <div className={`vh-100 ${color === "dark" ? "bg-dark" : "bg-body-tertiary"}`} data-bs-theme={color}>

      <NavBar />
      <div className='vh-80 overflow-y-auto m2 p-2'>
        <Routes>
          {user &&
            <>
              <Route path="/create-card" element={<Createcard />} />
              <Route path="/my-cards" element={<MyCards />} />
              <Route path="/my-favorites" element={<FavoriteCards />} />
              <Route path="/my-business" element={<MyBusiness />} />
              <Route path="/cards/:cardId" element={<EditCard />} />
              <Route path="/card-details/:cardId" element={<CardDetails />} />
              <Route path="/search/:search" element={<Cardspage />} />
              <Route path="/userslist" element={<UserList />} />
              <Route path="/about" element={<About />} />

            </>
          }
          <Route path="/" element={<Cardspage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" reaplce />} />

        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
