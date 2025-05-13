import { useContext } from "react"
import context from "../context/Context"
import PageTitle from "../components/PageTitle"
import aboutCards from '../assets/about-cards.png'

function About() {
    const { color } = useContext(context)
    return (
        <div className={`container ${color === "dark" ? "text-white" : "bg-body-tertiary"}`}>
            <PageTitle title="About this website" description="This website contains business card of all kind of businesses you can reach them out easily" />
            <img className="w-50 mt-2" src={aboutCards} alt="about cards" />
        </div>
    )
}

export default About;