import { useParams } from "react-router-dom"
import React from "react"

const worker = (props) => {
    const {id} = useParams()
    return (
        <p>{`worker ${id}`}</p>
    )
}

export default worker