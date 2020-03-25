import { useParams } from "react-router-dom"
import React from "react"

const job = (props) => {
    const {id} = useParams()
    return (
        <p>{`job ${id}`}</p>
    )
}

export default job