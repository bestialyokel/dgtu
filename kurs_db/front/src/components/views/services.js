import React, { Component, useState, useEffect, useContext } from "react";
import {Switch, Route} from "react-router-dom"
import Table from '../common/Table'
import {UserContext, TokenContext} from '../../context/context'
import {RULES} from "../../utils/constants"


const columns = [
    {title: 'ID услуги', field: 'id_service', editable: 'never'},
    {title: 'Название', field: 'name'},
    {title: 'Описание', field: 'description'},
]

const fillData = async (setState, token) => {
    let url = new URL('services', 'http://localhost:8080')
    url.search = new URLSearchParams({ key: token })
    try {
        const req = await fetch(url, {method: 'GET'})
        const {services} = await req.json()
        services.forEach(async (x) => {
            let url = new URL(`services/${x}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            const req = await fetch(url, {method: 'GET'})
            const {service} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...oldState.data, service]
                }
            })
        })
    } catch(error) {
        console.log(error)
    }
}

const Services = (props) => {
    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const [state, setState] = useState({columns,data: []})

    useEffect(() => {
        fillData(setState, token)
        return () => {}
    }, [])

    const handleAdd = async (newData) => {
        let url = new URL(`services`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData })
        try {
            let req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            url = new URL(`services/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {service} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...state.data, service]
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    const editable = {
        onRowAdd: RULES["clients"]["POST"].includes(user.role) ? handleAdd : null,
        onRowDelete: oldData =>
            new Promise(async (resolve, reject) => {
                console.log(1)
                resolve()
            }),
    }
    
    return (
        <Switch>
            <Route path="/">
                <Table
                title="Services"
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

export default Services
