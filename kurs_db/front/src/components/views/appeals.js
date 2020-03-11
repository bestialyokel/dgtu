import React, { Component, useState, useEffect, useContext } from "react";

import {TokenContext} from '../../context'

const columns = [
    {title: 'ID обращения', field: 'id_appeal', editable: 'never'},
    {title: 'ID контракт', field: 'id_contract', editable: 'onAdd'},
    {title: 'Описание', field: 'description', emptyValue: 'null'},
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
            let url = new URL(`appeals/${x.id_appeal}`, 'http://localhost:8080')
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

const handleAdd = async (setState, token, newData) => {
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
                data: [...state.data, {...appeal}]
            }
        })
    } catch(error) {

    }
}

const Appeals = (props) => {
    const {user} = props
    const token = useContext(TokenContext)
    const [state, setState] = useState({columns, data: []})
    
    useEffect(() => {
        fillData(setState, token)//? async
        return () => {}
    }, [])

    let onAdd = async (newData) => {
        let url = new URL(`appeals`, 'http://localhost:8080')
        url.search = new URLSearchParams({
            key: getCookie('key'),
            ...newData
        })
        const req = await fetch(url, {
            method: 'POST'
        })
        const json = await req.json()
        setState(oldState => {
            return {
                ...oldState,
                data: [...state.data, {...newData, idappeal: json.id}]
            }
        })
    }


    let editable = {
        onRowAdd: ['a'].includes(user.role) ? onAdd : null, //добавить проверки на роли.
    }


    return (
        <Table
            title="Appeals"
            columns={state.columns}
            data={state.data}
            editable={editable}
        />
    )

}

export default Appeals
