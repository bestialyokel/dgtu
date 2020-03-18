import React, { Component, useState, useEffect, useContext } from "react";
import {Switch, Route} from "react-router-dom"
import Table from '../common/Table'
import {UserContext, TokenContext} from '../../context/context'
import {RULES} from "../../utils/constants"

import { Link } from "react-router-dom";

const columns = [
    {title: 'ID контракта', field: 'id_contract',
        render: rowData => (
            <Link to={`/contracts/${rowData.id_contract}`}>
                {rowData.id_contract}
            </Link>
        )
    },
    {title: 'ID клиента', field: 'id_client',
        render: rowData => (
            <Link to={`/clients/${rowData.id_client}`}>
                {rowData.id_client}
            </Link>
        )
    },
    {title: 'ID тарифа', field: 'id_tariff',
        render: rowData => (
            <Link to={`/tariffs/${rowData.id_tariff}`}>
                {rowData.id_tariff}
            </Link>
        )
    },
    {title: 'Адресс', field: 'address'},
    {title: 'Тип контракта', field: 'contract_type'}
]

const fillData = async (setState, token) => {
    let url = new URL('contracts', 'http://localhost:8080')
    url.search = new URLSearchParams({ key: token })
    try {
        const req = await fetch(url, {method: 'GET'})
        const {contracts} = await req.json()
        contracts.forEach(async (x) => {
            let url = new URL(`contracts/${x}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            const req = await fetch(url, {method: 'GET'})
            const {contract} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...oldState.data, contract]
                }
            })
        })
    } catch(error) {
        console.log(error)
    }
}

const Contracts = (props) => {
    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const [state, setState] = useState({columns,data: []})

    useEffect(() => {
        fillData(setState, token)
        return () => {}
    }, [])

    /*const handleAdd = async (newData) => {
        let url = new URL(`contracts`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData })
        try {
            let req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            url = new URL(`contracts/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {contract} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...state.data, contract]
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    const editable = {
        onRowAdd: RULES["contracts"]["POST"].includes(user.role) ? handleAdd : null
    }
    */
    return (
        <Table
            title="Contracts"
            columns={state.columns}
            data={state.data}
            //editable={editable}
        />
    )

}

export default Contracts
