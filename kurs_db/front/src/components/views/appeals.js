import React, { Component, useState, useEffect, useContext} from "react";

import {UserContext, TokenContext} from '../../context/context'
import Table from '../common/Table'

import { Link, useHistory } from "react-router-dom";


const columns = [
    {title: 'ID обращения', field: 'id_appeal', editable: 'never',


    },
    {title: 'ID контракт', field: 'id_contract', 

    },
    {title: 'Описание', field: 'description'},
    {title: 'Статус', field: 'status', 
        lookup: {'o' : 'Открыт', 'c': 'Закрыт', 'p': 'Ведутся работы'}
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
    
    const history = useHistory()

    useEffect(() => {
        fillData(setState, token)
        return () => {}
    }, [])

    


    return (
        <Table
            title="Appeals"
            columns={state.columns}
            data={state.data}
            onRowClick={(event, rowData) => history.push(`/appeals/${rowData.id_appeal}`) }
        />
    )

}

export default Appeals
