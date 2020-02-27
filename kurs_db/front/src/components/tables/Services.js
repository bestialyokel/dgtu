import React, { Component, useState, useEffect } from "react";
import getCookie from '../../tools/getcookie'
import Table from '../common/Table';

const Services = (props) => {
    const {user} = props
    const [state, setState] = useState({
        columns: [
            {title: 'ID услуги', field: 'idservice', editable: 'never'},
            {title: 'Название', field: 'name'},
        ],
        data: []
    })

    useEffect(() => {
        (async () => {
            let url = new URL('services', 'http://localhost:8080')
            url.search = new URLSearchParams({
                key: getCookie('key')
            })
            const req = await fetch(url, {
                method: 'GET'
            })
            const json = await req.json()
            json.services.forEach(async (x) => {
                let url = new URL(`services/${x.idservice}`, 'http://localhost:8080')
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
                        data: [...oldState.data, json.service]
                    }
                })
            })
            
        })()
        return () => {console.error('services svernut da')}
    }, [])

    let onAdd = async (newData) => {
        let url = new URL(`services`, 'http://localhost:8080')
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
                data: [...state.data, {...newData, idservice: json.id}]
            }
        })
    }
    let onUpdate = async (newData, oldData) => {
        new Promise(
            async (resolve, reject) => {
                let url = new URL(`services/${oldData.idservice}`, 'http://localhost:8080')
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
                let url = new URL(`services/${oldData.idservice}`, 'http://localhost:8080')
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
        onRowAdd: ['d'].includes(user.role) ? onAdd : null,
        onRowUpdate: ['d'].includes(user.role) ? onUpdate : null,
        onRowDelete: ['d'].includes(user.role) ? onDelete : null
    }
    

    return (
        <Table
            title="Services"
            columns={state.columns}
            data={state.data}
            editable={editable}
        />
    )




}

export default Services