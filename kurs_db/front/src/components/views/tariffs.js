import React, { Component, useState, useEffect, useContext } from "react";
import {Switch, Route, useHistory} from "react-router-dom"
import Table from '../common/Table'
import {UserContext, TokenContext} from '../../context/context'
import {RULES} from "../../utils/constants"

import { Link } from "react-router-dom";

const columns = [
    {title: 'ID тарифа', field: 'id_tariff', editable: 'never',
    },
    {title: 'Имя', field: 'name'},
    {title: 'Платеж', field: 'payment'},
    {title: 'Период', field: 'period'},
]

const fillData = async (setState, token) => {
    let url = new URL('tariffs', 'http://localhost:8080')
    url.search = new URLSearchParams({ key: token })
    try {
        const req = await fetch(url, {method: 'GET'})
        const {tariffs} = await req.json()
        tariffs.forEach(async (x) => {
            let url = new URL(`tariffs/${x}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            const req = await fetch(url, {method: 'GET'})
            const {tariff} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...oldState.data, tariff]
                }
            })
        })
    } catch(error) {
        console.log(error)
    }
}

const Tariffs = (props) => {
    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const [state, setState] = useState({columns,data: []})
    const history = useHistory()

    useEffect(() => {
        fillData(setState, token)
        return () => {}
    }, [])

    const handleAdd = async (newData) => {
        let url = new URL(`tariffs`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData })
        try {
            let req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            url = new URL(`tariffs/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {tariff} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...state.data, tariff]
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    const editable = {
        onRowAdd: RULES["clients"]["POST"].includes(user.role) ? handleAdd : null
    }
    
    return (
        <Table
            title="Tariffs"
            columns={state.columns}
            data={state.data}
            editable={editable}
            onRowClick={(event, rowData) => history.push(`/tariffs/${rowData.id_tariff}`) }
        />
    )

}

export default Tariffs