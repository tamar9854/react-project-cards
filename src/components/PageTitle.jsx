import { useContext } from "react"
import context from "../context/Context"

function PageTitle({ title, description }) {
    const { color } = useContext(context)
    return (
        <div className={`container ${color === "dark" ? "text-white" : "bg-body-tertiary"}`}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

export default PageTitle