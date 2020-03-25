import { useParams } from "react-router-dom"
import React from "react"

const contract = (props) => {
    const {id} = useParams()
    return (
        <p>{`contract ${id}`}</p>
    )
}

export default contract