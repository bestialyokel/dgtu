import React, { Component, useState, useEffect, useContext } from "react";
import {Switch, Route, useHistory} from "react-router-dom"
import Table from '../common/Table'
import {UserContext, TokenContext} from '../../context/context'
import {RULES} from "../../utils/constants"

import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";

const columns = [
    {title: 'Имя дампа', field: 'name'}
]

const fillData = async (setState, token) => {
    let url = new URL('dumps', 'http://localhost:8080')
    url.search = new URLSearchParams({ key: token })
    try {
        const req = await fetch(url, {method: 'GET'})
        let dumps = await req.json()
        setState(oldState => {
            return {
                ...oldState,
                data: [...oldState.data, ...dumps.map(x => ({name: x}) ) ]
            }
        })
    } catch(error) {
        console.log(error)
    }
}

const Dumps = (props) => {
    const {logOut} = props
    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const [state, setState] = useState({columns, data: []})

    const [isLoading, setLoading] = useState(false)

    const history = useHistory()

    const handleRowSelect = async (rowData) => {
        const serial = rowData.tableData.id
        let url = new URL(`dumps/${serial}`, 'http://localhost:8080')
        url.search = new URLSearchParams({key: token})
        try {
            //я блокирую евент клика по дампу..
            setLoading(true)
            const req = await fetch(url, {method: 'PUT'})
            const res = await req.json()
            logOut()
        } catch(error) {

        }
    } 

    const makeDump = async () => {
        let url = new URL(`dumps/`, 'http://localhost:8080')
        url.search = new URLSearchParams({key: token})
        try {
            //я блокирую евент клика по дампу..
            setLoading(true)
            const req = await fetch(url, {method: 'POST'})
            const res = await req.json()
            console.log(res)
            history.push('/')
        } catch(error) {

        }
    }

    useEffect(() => {
        fillData(setState, token)
        return () => {}
    }, [])
    
    return (
        <Grid container>
            <Grid container item justify="center">
                <Button onClick={() => makeDump()}>Сделать думп</Button>
            </Grid>
            <Grid container item justify="center">
                <Table
                    title="dumps"
                    columns={state.columns}
                    data={state.data}
                    onRowClick={(event, rowData) => isLoading ? null : handleRowSelect(rowData) }
                />
            </Grid>
        </Grid>
    )

}

export default Dumps
