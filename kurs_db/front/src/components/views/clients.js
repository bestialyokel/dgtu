import React, { Component, useState, useEffect, useContext } from "react";
import {Switch, Route} from "react-router-dom"
import Table from '../common/Table'
import {UserContext, TokenContext} from '../../context/context'
import {RULES} from "../../utils/constants"


const columns = [
    {title: 'ID клиента', field: 'id_client'},
    {title: 'Имя', field: 'name'},
    {title: 'Фамилия', field: 'surname'},
    {title: 'Отчество', field: 'patronymic'},
    {title: 'Номер тел.', field: 'phone_number'}
]

const fillData = async (setState, token) => {
    let url = new URL('clients', 'http://localhost:8080')
    url.search = new URLSearchParams({ key: token })
    try {
        const req = await fetch(url, {method: 'GET'})
        const {clients} = await req.json()
        clients.forEach(async (x) => {
            let url = new URL(`clients/${x}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            const req = await fetch(url, {method: 'GET'})
            const {client} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...oldState.data, client]
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

    useEffect(() => {
        fillData(setState, token)
        return () => {}
    }, [])

    const handleAdd = async (newData) => {
        let url = new URL(`clients`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData })
        try {
            const req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            console.log(id)
            url = new URL(`clients/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {client} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...state.data, {...client}]
                }
            })
        } catch(error) {
            console.log(error)
        }
    }
    const editable = {
        onRowAdd: RULES["clients"]["POST"].includes(user.role) ? handleAdd : null
    }
    console.log(editable)
    return (
        <Switch>
            <Route path="/">
                <Table
                title="Clients"
                columns={state.columns}
                data={state.data}
                editable={editable}
                />
            </Route>
            <Route path="/123">
                123
            </Route>
        </Switch>
    )

}

export default Clients
