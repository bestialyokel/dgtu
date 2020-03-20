import { useParams } from "react-router-dom"
import React from "react"


import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { TextField } from "@material-ui/core"
import { useReducer } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { UserContext, TokenContext } from "../../../context/context"



/*

const STATUS = {
    FETCH: 0,
    IDLE: 1,
    EDIT: 2,
    DELETED: 3,
    ERROR: 4,
}

const reducer = (state, event) => {
    switch(event.type) {
        case "FETCH":
            return {
                ...state,
                status: STATUS.FETCH
            }
        case "ERROR":
            return {
                ...state,
                status: STATUS.ERROR,
                error: event.error
            }
        case "IDLE":
            return {
                ...state,
                status: STATUS.FETCH,
                data: event.data
            }
        case "EDIT":
            return {
                ...state,
                status: STATUS.EDIT
            }
        case "DELETE":
            return {
                ...state,
                status: STATUS.DELETED
            }
    }
}

const initState = {
    status: STATUS.FETCH,
    data: null,
    error: null,
}

const TextFields = [
    {disabled: true, label: "ID клиента", defaultValue: (data) => data.id_client,
    },
    {label: "Имя", defaultValue: (data) => data.name, 
        onChange: (data, setData) => setData({...data, name: event.target.value})
    },
    {label: "Фамилия", defaultValue: (data) => data.name, 
        onChange: (data, setData) => setData({...data, name: event.target.value})
    },
    {label: "Отчество", defaultValue: (data) => data.name, 
        onChange: (data, setData) => setData({...data, name: event.target.value})
    },
    {label: "Имя", defaultValue: (data) => data.name, 
        onChange: (data, setData) => setData({...data, name: event.target.value})
    }
]


onChange: (data, setData) => setData({...data, id_client: event.target.value})

*/

const useStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1,
        padding: theme.spacing(10)
    },
}))

const client = (props) => {
    const token = useContext(TokenContext)
    const user = useContext(UserContext)
    const {id} = useParams()
    const classes = useStyles()


    const [isLoading, setLoading] = useState(true)
    const [client, setClient] = useState(null)

    useEffect(() => {
        ;(async () => {
            try {
                let url = new URL(`clients/${6}`, 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
                const req = await fetch(url, {method: 'GET'})
                const {client} = await req.json()
                setClient(client)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <Grid container spacing={6} className={classes.container}>
            <Grid container item xs={12} md={6} lg={3} justify='center'>
                <TextField disabled id="standard-required" label="ID клиента" defaultValue="0" />
            </Grid>
            <Grid container item xs={12} md={6} lg={3} justify='center'>
                <TextField required id="standard-required" label="Имя" defaultValue="Имя" />
            </Grid>
            <Grid container item xs={12} md={6} lg={3} justify='center'>
                <TextField required id="standard-required" label="Фамилия" defaultValue="Фамилия" />
            </Grid>
            <Grid container item xs={12} md={6} lg={3} justify='center'>
                <TextField required id="standard-required" label="Отчество" defaultValue="Отчество" />
            </Grid>
            <Grid container item xs={12} md={6} lg={3} justify='center'>
                <TextField required id="standard-required" label="Тел. номер" defaultValue="+79991112233" />
            </Grid>
            <Grid container item justify='center'>
                {client ? JSON.stringify(client) : "client"}
            </Grid>
        </Grid>
    )
}

export default client