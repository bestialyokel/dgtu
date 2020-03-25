import { useParams, Redirect, Link } from "react-router-dom"
import React from "react"


import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { TextField, ButtonGroup, Button, Typography } from "@material-ui/core"
import { useReducer } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { UserContext, TokenContext } from "../../../context/context"



import Table from "../../common/Table"


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
        paddingTop: theme.spacing(10)
    }
}))


const contractsColumns = [
    {title: 'ID контракта', field: 'id_contract', editable: 'never',

    },
    {title: 'Тариф', field: 'id_tariff', editable: 'never',},
    {title: 'Адрес', field: 'address'},
    {title: 'Тип контракта', field: 'contract_type', 
        lookup: {'ф' : 'физ. лицо', 'ю': 'юр. лицо'}
    }
]


const client = (props) => {
    const token = useContext(TokenContext)
    const user = useContext(UserContext)
    let {id} = useParams()

    id = id || 9 // test

    const classes = useStyles()

    const [state, dispatch] = useReducer(reducer, initState)


    const {data, status, error} = state

    let dataCopy = data

    


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
            url.search = new URLSearchParams({...dataCopy, key: token})
            await fetch(url, {method: 'PUT'})
            url.search = new URLSearchParams({key: token})
            let req = await fetch(url, {method: 'GET'})
            let {client} = await req.json()
            dispatch({type: "IDLE", data: client})
        }
        
    }

    const [contracts, setContracts] = useState({columns: contractsColumns, data: []})

    const addContract = async (newData) => {
        let url = new URL(`contracts`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData, id_client: id})
        try {
            let req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            url = new URL(`contracts/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {contract} = await req.json()
            setContracts(oldState => {
                return {
                    ...oldState,
                    data: [...contracts.data, contract]
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    const contractsEditable = {
        onRowAdd: addContract 
    }

    useEffect(() => {
        ;(async () => {
            try {
                let url = new URL(`clients/${id}`, 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
                const req = await fetch(url, {method: 'GET'})
                const {client} = await req.json()
                const {contracts} = client
                console.log(contracts)
                contracts.forEach(async x => {
                    const url = new URL(`contracts/${x}`, 'http://localhost:8080')
                    url.search = new URLSearchParams({key: token})
                    const req = await fetch(url, {method: 'GET'})
                    const {contract} = await req.json()
                    setContracts(oldState => {
                        return {
                            ...oldState,
                            data: [...oldState.data, contract]
                        }
                    })
                })
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
            <Grid container item xs={12} lg={12} md={12} justify='center' className={classes.buttonsContainer}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button onClick={onDelete}>Удалить</Button>
                    <Button onClick={toggleEdit}>{status == STATUS.EDIT ? "Сохранить" : "Редактировать"}</Button>
                    <Button>История</Button>
                </ButtonGroup>
            </Grid>
            <Grid container spacing={6} className={classes.container}>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled id="standard-required" label="ID клиента" defaultValue={data.id_client}/>
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Имя" defaultValue={data.name}
                        onChange={(event) => dataCopy = {...dataCopy, name: event.currentTarget.value}}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Фамилия" defaultValue={data.surname} 
                        onChange={(event) => dataCopy = {...dataCopy, surname: event.currentTarget.value}}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Отчество" defaultValue={data.patronymic} 
                        onChange={(event) => dataCopy = {...dataCopy, patronymic: event.currentTarget.value}}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField  disabled={status == STATUS.IDLE} id="standard-required" label="Тел. номер" defaultValue={data.phone_number}
                        onChange={(event) => dataCopy = {...dataCopy, phone_number: event.currentTarget.value}}
                    />
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Typography display="block" variant="h6">
                    Контракты
                </Typography>   
            </Grid>
            <Grid container justify='center' className={classes.table}> 
                <Table
                    title={`Клиент: ${[data.name, data.surname, data.patronymic].join(' ')}`}
                    columns={contracts.columns}
                    data={contracts.data}
                    editable={contractsEditable}
                />
            </Grid>
        </Grid>
    )
}

export default client