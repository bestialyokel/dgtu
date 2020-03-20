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


const STATUS = {
    FETCH: 0,
    IDLE: 1,
    EDIT: 2,
    DELETE: 3,
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
                status: STATUS.IDLE,
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
                status: STATUS.DELETE
            }
    }
}


const initState = {
    status: STATUS.FETCH,
    data: null,
    error: null
}


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

    const [state, dispatch] = useReducer(reducer, initState)

    const {data, status, error} = state

    useEffect(() => {
        ;(async () => {
            try {
                let url = new URL(`clients/${9}`, 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
                const req = await fetch(url, {method: 'GET'})
                const {client} = await req.json()
                dispatch({type: "IDLE", data: client})
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    
    if (status == STATUS.FETCH) return "...loading"
    
    return (
        <Grid container spacing={6} className={classes.container}>
            <Grid container item xs={12} md={6} lg={3} justify='center'>
                <TextField disabled id="standard-required" label="ID клиента" defaultValue={data.id_client} />
            </Grid>
            <Grid container item xs={12} md={6} lg={3} justify='center'>
                <TextField required id="standard-required" label="Имя" defaultValue={data.name}/>
            </Grid>
            <Grid container item xs={12} md={6} lg={3} justify='center'>
                <TextField required id="standard-required" label="Фамилия" defaultValue={data.surname} />
            </Grid>
            <Grid container item xs={12} md={6} lg={3} justify='center'>
                <TextField required id="standard-required" label="Отчество" defaultValue={data.patronymic} />
            </Grid>
            <Grid container item xs={12} md={6} lg={3} justify='center'>
                <TextField required id="standard-required" label="Тел. номер" defaultValue={data.phone_number}/>
            </Grid>
            <Grid container item justify='center'>
                
            </Grid>
        </Grid>
    )
}

export default client