import { useParams } from "react-router-dom"
import React from "react"

const client = (props) => {
    const {id} = useParams()
    return (
        <p>{`client ${id}`}</p>
    )
}

export default client