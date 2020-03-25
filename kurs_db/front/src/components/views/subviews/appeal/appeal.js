import { useParams } from "react-router-dom"
import React from "react"

const appeal = (props) => {
    const {id} = useParams()
    return (
        <p>{`appeal ${id}`}</p>
    )
}

export default appeal