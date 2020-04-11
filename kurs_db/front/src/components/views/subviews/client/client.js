import { useParams, Redirect, Link } from "react-router-dom"
import React from "react"


import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { TextField, ButtonGroup, Button, Typography, Dialog } from "@material-ui/core"
import { useReducer } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { UserContext, TokenContext } from "../../../../context/context"



import Contracts from "./contracts"


import HistoryTable from "./historyTable"
import { RULES } from "../../../../utils/constants"


const STATUS = {
    FETCH: 0,
    IDLE: 1,
    EDIT: 2,
    DELETE: 3,
    ERROR: 4,
    HISTORY: 5
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
                status: STATUS.EDIT,
                data: event.data
            }
        case "DELETE":
            return {
                ...state,
                status: STATUS.DELETE,
            }
        case "HISTORY": 
            return {
                ...state,
                status: STATUS.HISTORY
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
    buttonsContainer: {
        paddingTop: theme.spacing(5)
    },
    table: {
        paddingTop: theme.spacing(5)
    }
}))


const client = (props) => {
    const token = useContext(TokenContext)
    const user = useContext(UserContext)
    let {id} = useParams()

    id = id || 9 // test

    const classes = useStyles()

    const [state, dispatch] = useReducer(reducer, initState)

    const {data, status, error} = state
    
    const {id_client, name, surname, patronymic, phone_number} = data || {}

    const onDelete = () => {
        let url = new URL(`clients/${id}`, 'http://localhost:8080')
        url.search = new URLSearchParams({key: token})
        fetch(url, {method: 'DELETE'})
        dispatch({type: "DELETE"})
    }

    const onHistory = () => {}

    const toggleEdit = async () => {
        if (status == STATUS.IDLE) {
            dispatch({type: "EDIT", data})
        } else if (status == STATUS.EDIT) {
            let url = new URL(`clients/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({...data, key: token})
            await fetch(url, {method: 'PUT'})
            url.search = new URLSearchParams({key: token})
            let req = await fetch(url, {method: 'GET'})
            let {client} = await req.json()
            dispatch({type: "IDLE", data: client})
        }
        
    }

    const [isDialogOpened, setDialogOpened] = useState(false)

    const handleOpen = () => {
        setDialogOpened(true)
    }

    const handleClose = () => {
        setDialogOpened(false)
    }


    const handleHistorySelect = async (historyData) => {
        // очень стыдно
        let extractedData = {contracts: data.contracts}
        Object.keys(data).forEach(key => extractedData[key] = historyData[key])
        dispatch({type: "EDIT", data: extractedData})
        setDialogOpened(false)
    }

    useEffect(() => {
        ;(async () => {
            try {
                let url = new URL(`clients/${id}`, 'http://localhost:8080')
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

    if (status == STATUS.DELETE) return <Redirect to="/"/>



    return (
        <Grid container>
            <Dialog
                onClose={handleClose}
                open={isDialogOpened}
                maxWidth={'md'}
            >
                {data && 
                    <HistoryTable 
                        client={data} 
                        onSelect={handleHistorySelect} 
                    />
                }
            </Dialog>
            <Grid container item xs={12} lg={12} md={12} justify='center' className={classes.buttonsContainer}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    {RULES["clients"]["DELETE"].includes(user.role) && <Button onClick={onDelete}>Удалить</Button>}
                    {RULES["clients"]["PUT"].includes(user.role) && <Button onClick={toggleEdit}>{status == STATUS.EDIT ? "Сохранить" : "Редактировать"}</Button>}
                    {RULES["clients"]["PUT"].includes(user.role) && <Button onClick={handleOpen}>История</Button>}
                </ButtonGroup>
            </Grid>
            <Grid container spacing={6} className={classes.container}>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled id="standard-required" label="ID клиента" defaultValue={id_client}/>
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Имя" defaultValue={name}
                        onChange={(event) => dispatch({type: "EDIT", data: {...data, name: event.target.value}})}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Фамилия" defaultValue={surname} 
                        onChange={(event) => dispatch({type: "EDIT", data: {...data, surname: event.target.value}})}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Отчество" defaultValue={patronymic} 
                        onChange={(event) => dispatch({type: "EDIT", data: {...data, patronymic: event.target.value}})}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField  disabled={status == STATUS.IDLE} id="standard-required" label="Тел. номер" defaultValue={phone_number}
                        onChange={(event) => dispatch({type: "EDIT", data: {...data, phone_number: event.target.value}})}
                    />
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Typography display="block" variant="h6">
                    Контракты
                </Typography>   
            </Grid>
            <Grid container justify='center' className={classes.table}> 
                {data && RULES["contracts"]["GET"].includes(user.role) &&
                    <Contracts
                        client={data}
                    />
                }
            </Grid>
        </Grid>
    )
}

export default client