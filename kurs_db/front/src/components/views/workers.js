import React, { Component, useState, useEffect, useContext } from "react";
import {Switch, Route, useHistory} from "react-router-dom"
import Table from '../common/Table'
import {UserContext, TokenContext} from '../../context/context'
import {RULES} from "../../utils/constants"

import { Link } from "react-router-dom";

const columns = [
    {title: 'ID работника', field: 'id_worker', editable: 'never',
    },
    {title: 'ID работы', field: 'id_job', editable: 'never',

    },
    {title: 'Имя', field: 'name'},
    {title: 'Фамилия', field: 'surname'},
    {title: 'Отчество', field: 'patronymic'},
    {title: 'Навыки', field: 'skills'}
]

const fillData = async (setState, token) => {
    let url = new URL('workers', 'http://localhost:8080')
    url.search = new URLSearchParams({ key: token })
    try {
        const req = await fetch(url, {method: 'GET'})
        const {workers} = await req.json()
        workers.forEach(async (x) => {
            let url = new URL(`workers/${x}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            const req = await fetch(url, {method: 'GET'})
            const {worker} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...oldState.data, worker]
                }
            })
        })
    } catch(error) {
        console.log(error)
    }
}

const Clients = (props) => {
    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const [state, setState] = useState({columns,data: []})
    const history = useHistory()

    useEffect(() => {
        fillData(setState, token)
        return () => {}
    }, [])

    /*
    const handleAdd = async (newData) => {
        let url = new URL(`clients`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData })
        try {
            let req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            console.log(id)
            url = new URL(`clients/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {client} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...state.data, client]
                }
            })
        } catch(error) {
            console.log(error)
        }
    }
    const editable = {
        onRowAdd: RULES["clients"]["POST"].includes(user.role) ? handleAdd : null
    }
    */

    return (
        <Table
            title="Workers"
            columns={state.columns}
            data={state.data}
            onRowClick={(event, rowData) => history.push(`/workers/${rowData.id_worker}`) }
            //editable={editable}
        />
    )

}

export default Clients
