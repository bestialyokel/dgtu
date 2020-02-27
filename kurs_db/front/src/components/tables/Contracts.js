import React, { Component, useState, useEffect } from "react";
import getCookie from '../../tools/getcookie'
import Table from '../common/Table';

const Contracts = (props) => {
    const {user} = props
    const [state, setState] = useState({
        columns: [
            {title: 'ID контракта', field: 'idcontract', editable: 'never'},
            {title: 'ID клиента', field: 'idclient', editable: 'onAdd'},
            {title: 'ID тарифа', field: 'idtariff'},
            {title: 'Адрес', field: 'address'},
            {title: 'Тип', field: 'type'}
        ],
        data: []
    })

    useEffect(() => {
        (async () => {
            let url = new URL('contracts', 'http://localhost:8080')
            url.search = new URLSearchParams({
                key: getCookie('key')
            })
            const req = await fetch(url, {
                method: 'GET'
            })
            const json = await req.json()
            json.contracts.forEach(async (x) => {
                let url = new URL(`contracts/${x.idcontract}`, 'http://localhost:8080')
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
                        data: [...oldState.data, json.contract]
                    }
                })
            })
            
        })()
        return () => {console.error('contracts svernut da')}
    }, [])

    let onAdd = async (newData) => {
        let url = new URL(`contracts`, 'http://localhost:8080')
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
                data: [...state.data, {...newData, idcontract: json.id}]
            }
        })
    }
    let onUpdate = async (newData, oldData) => {
        new Promise(
            async (resolve, reject) => {
                let url = new URL(`contracts/${oldData.idcontract}`, 'http://localhost:8080')
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
                let url = new URL(`contracts/${oldData.idcontract}`, 'http://localhost:8080')
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
            title="Contracts"
            columns={state.columns}
            data={state.data}
            editable={editable}
        />
    )

}

export default Contracts
