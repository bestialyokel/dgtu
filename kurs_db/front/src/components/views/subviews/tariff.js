import { useParams } from "react-router-dom"
import React from "react"


const tariff = (props) => {
    const {id} = useParams()
    return (
        <p>{`tariff ${id}`}</p>
    )
}

export default tariff