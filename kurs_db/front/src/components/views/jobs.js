import React, { Component, useState, useEffect, useContext } from "react";
import {Switch, Route} from "react-router-dom"
import Table from '../common/Table'
import {UserContext, TokenContext} from '../../context/context'
import {RULES} from "../../utils/constants"

import { Link } from "react-router-dom";

const columns = [
    {title: 'ID работы', field: 'id_job',

    },
    {title: 'ID обращения', field: 'id_appeal',

    },
    {title: 'Описание', field: 'description'},
    {title: 'Статус', field: 'status'},
]

const fillData = async (setState, token) => {
    let url = new URL('jobs', 'http://localhost:8080')
    url.search = new URLSearchParams({ key: token })
    try {
        const req = await fetch(url, {method: 'GET'})
        const {jobs} = await req.json()
        jobs.forEach(async (x) => {
            let url = new URL(`jobs/${x}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            const req = await fetch(url, {method: 'GET'})
            const {job} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...oldState.data, job]
                }
            })
        })
    } catch(error) {
        console.log(error)
    }
}

const Jobs = (props) => {
    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const [state, setState] = useState({columns,data: []})

    useEffect(() => {
        fillData(setState, token)
        return () => {}
    }, [])

    const handleAdd = async (newData) => {
        let url = new URL(`jobs`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData })
        try {
            let req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            url = new URL(`jobs/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {job} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...state.data, job]
                }
            })
        } catch(error) {
            console.log(error)
        }
    }
    /*
    const editable = {
        onRowAdd: RULES["jobs"]["POST"].includes(user.role) ? handleAdd : null
    }
    */
    //console.log(editable)
    return (
        <Table
            title="Jobs"
            columns={state.columns}
            data={state.data}
            //editable={editable}
        />
    )

}

export default Jobs
