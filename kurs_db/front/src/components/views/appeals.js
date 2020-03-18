import React, { Component, useState, useEffect, useContext} from "react";

import {UserContext, TokenContext} from '../../context/context'
import Table from '../common/Table'

import { Link } from "react-router-dom";


const columns = [
    {title: 'ID обращения', field: 'id_appeal', editable: 'never',
        render: rowData => (
            <Link to={`/appeals/${rowData.id_appeal}`}>
                {rowData.id_appeal}
            </Link>
        )

    },
    {title: 'ID контракт', field: 'id_contract', 
        render: rowData => (
            <Link to={`/contracts/${rowData.id_contract}`}>
                {rowData.id_contract}
            </Link>
        )
    },
    {title: 'Описание', field: 'description'},
    {title: 'Статус', field: 'status', emptyValue: 'null', 
        //lookup: 
    }
]

const fillData = async (setState, token) => {
    let url = new URL('appeals', 'http://localhost:8080')
    url.search = new URLSearchParams({ key: token })
    try {
        const req = await fetch(url, {method: 'GET'})
        const {appeals} = await req.json()
        appeals.forEach(async (x) => {
            let url = new URL(`appeals/${x}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            const req = await fetch(url, {method: 'GET'})
            const {appeal} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...oldState.data, appeal]
                }
            })
        })
    } catch(error) {
        console.log(error)
    }
}

const Appeals = (props) => {
    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const [state, setState] = useState({columns, data: []})
    
    useEffect(() => {
        fillData(setState, token)
        return () => {}
    }, [])

    /*
    const handleAdd = async (newData) => {
        let url = new URL(`appeals`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData })
        try {
            const req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            url = new URL(`appeals/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {appeal} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...state.data, appeal]
                }
            })
        } catch(error) {
    
        }
    }

    const editable = {
        onRowAdd: RULES["appeals"]["POST"].includes(user.role) ? handleAdd : null
    }*/


    return (
        <Table
            title="Appeals"
            columns={state.columns}
            data={state.data}
            //editable={editable}
        />
    )

}

export default Appeals
