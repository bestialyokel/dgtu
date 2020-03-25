import { useParams } from "react-router-dom"
import React from "react"


const service = (props) => {
    const {id} = useParams()
    return (
        <p>{`service ${id}`}</p>
    )
}

export default service