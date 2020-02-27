import React, { Component, useState, useEffect } from "react";
import getCookie from '../../tools/getcookie'

import Table from '../common/Table';

const Appeals = (props) => {
    const {user} = props
    const [state, setState] = useState({
        columns: [
            {title: 'ID обращения', field: 'idappeal', editable: 'never'},
            {title: 'ID контракт', field: 'idcontract', editable: 'onAdd'},
            {title: 'Описание', field: 'descr', emptyValue: 'null'}
        ],
        data: []
    })
    
    useEffect(() => {
        (async () => {
            let url = new URL('appeals', 'http://localhost:8080')
            url.search = new URLSearchParams({
                key: getCookie('key')
            })
            const req = await fetch(url, {
                method: 'GET'
            })
            const json = await req.json()
            json.appeals.forEach(async (x) => {
                let url = new URL(`appeals/${x.idappeal}`, 'http://localhost:8080')
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
                        data: [...oldState.data, json.appeal]
                    }
                })
            })
            
        })()
        return () => {console.error('appeals svernut da')}
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

    let onUpdate = async (newData, oldData) => {
        new Promise(
            async (resolve, reject) => {
                let url = new URL(`appeals/${oldData.idappeal}`, 'http://localhost:8080')
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
                let url = new URL(`appeals/${oldData.idappeal}`, 'http://localhost:8080')
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
        onRowAdd: ['a'].includes(user.role) ? onAdd : null, //добавить проверки на роли.
        onRowUpdate: ['a'].includes(user.role) ? onUpdate : null,
        onRowDelete: ['a'].includes(user.role) ? onUpdate : null
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
