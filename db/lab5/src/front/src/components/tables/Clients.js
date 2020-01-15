import React, { Component, useState, useEffect } from "react";
import getCookie from '../../tools/getcookie'

import Table from '../Table';

const Clients = (props) => {
    const {user} = props
    const [state, setState] = useState({
        columns: [
            {title: 'ID клиента', field: 'idclient', editable: 'never'},
            {title: 'Имя', field: 'name', editable: 'onAdd'},
            {title: 'Фамилия', field: 'surname', editable: 'onAdd'},
            {title: 'Отчество', field: 'patronymic', editable: 'onAdd'},
            {title: 'Номер тел.', field: 'phonenumber'}
        ],
        data: []
    })

    useEffect(() => {
        (async () => {
            let url = new URL('clients', 'http://localhost:8080')
            url.search = new URLSearchParams({
                key: getCookie('key')
            })
            const req = await fetch(url, {
                method: 'GET'
            })
            const json = await req.json()
            json.clients.forEach(async (x) => {
                let url = new URL(`clients/${x.idclient}`, 'http://localhost:8080')
                url.search = new URLSearchParams({
                    key: getCookie('key')
                })
                const req = await fetch(url, {
                    method: 'GET'
                })
                const json = await req.json()
                setState(oldState => {
                    return {
                        ...oldState,
                        data: [...oldState.data, json.client]
                    }
                })
            })
            
        })()
        return () => {console.error('clients svernut da')}
    }, [])

    let onAdd = async (newData) => {
        let url = new URL(`clients`, 'http://localhost:8080')
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
                data: [...state.data, {...newData, idclient: json.id}]
            }
        })
    }
    let onUpdate = async (newData, oldData) => {
        new Promise(
            async (resolve, reject) => {
                let url = new URL(`clients/${oldData.idclient}`, 'http://localhost:8080')
                url.search = new URLSearchParams({
                    key: getCookie('key'),
                    ...newData
                })
                const req = await fetch(url, {
                    method: 'PUT'
                })
                const json = await req.json()
                const mergedData = {...oldData, ...newData}
                const data = state.data
                const index = data.indexOf(oldData)
                setState(oldState => {
                    return {
                        ...oldState,
                        data: [...data.splice(0, index), mergedData, ...data.splice(index+1, data.length)]
                    }
                })
                resolve()
            }
        )
    }
    let onDelete = async (oldData) => 
        new Promise(
            async (resolve, reject) => {
                let url = new URL(`clients/${oldData.idclient}`, 'http://localhost:8080')
                url.search = new URLSearchParams({
                    key: getCookie('key')
                })
                const req = await fetch(url, {
                    method: 'DELETE'
                })
                const json = await req.json()
                const data = state.data
                const index = data.indexOf(oldData)
                setState(oldState => {
                    return {
                        ...oldState,
                        //delete from index
                        data: [...data.slice(0, index), ...data.slice(index+1, data.length)]
                    }
                })
                resolve()
            }
        )


    let editable = {
        onRowAdd: onAdd,
        onRowUpdate: onUpdate,
        onRowDelete: onDelete
    }
    
    return (
        <Table
            title="Clients"
            columns={state.columns}
            data={state.data}
            editable={editable}
        />
    )

}

export default Clients
