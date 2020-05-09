import { useParams, Redirect, Link } from "react-router-dom"
import React from "react"


import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { TextField, ButtonGroup, Button, Typography, Dialog, FormControl, InputLabel, Select, MenuItem} from "@material-ui/core"
import { useReducer } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { UserContext, TokenContext } from "../../../../context/context"



import Services from "./services"
import HistoryTable from "./historyTable"
import { RULES } from "../../../../utils/constants"
import service from "../service/service"



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


const tariff = (props) => {
    const token = useContext(TokenContext)
    const user = useContext(UserContext)
    let {id} = useParams()
    id = id || 1


    const classes = useStyles()


    const [state, dispatch] = useReducer(reducer, initState)

    const {data, status, error} = state

    const {id_tariff, name, payment, period, services} = data || {}

    console.log(services)

    const onDelete = () => {
        let url = new URL(`tariffs/${id}`, 'http://localhost:8080')
        url.search = new URLSearchParams({key: token})
        fetch(url, {method: 'DELETE'})
        dispatch({type: "DELETE"})
    }

    const toggleEdit = async () => {
        if (status == STATUS.IDLE) {
            dispatch({type: "EDIT", data: {...data, services: []}})
        } else if (status == STATUS.EDIT) {
            let url = new URL(`tariffs/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({...data, key: token})
            await fetch(url, {method: 'PUT'})
            url.search = new URLSearchParams({key: token})
            let req = await fetch(url, {method: 'GET'})
            let {tariff} = await req.json()
            dispatch({type: "IDLE", data: tariff})
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
        let extractedData = {services}
        Object.keys(data).forEach(key => extractedData[key] = historyData[key])
        dispatch({type: "EDIT", data: extractedData})
        setDialogOpened(false)
    }

    const onServiceSetChange = (services) => {
        dispatch({type: "EDIT", data: {...data, services}})
    }

    useEffect(() => {
        ;(async () => {
            try {
                let url = new URL(`tariffs/${id}`, 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
                const req = await fetch(url, {method: 'GET'})
                const {tariff} = await req.json()
                dispatch({type: "IDLE", data: tariff})
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
                        tariff={data} 
                        onSelect={handleHistorySelect} 
                    />
                }
            </Dialog>
            <Grid container item xs={12} lg={12} md={12} justify='center' className={classes.buttonsContainer}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    { RULES["tariffs"]["DELETE"].includes(user.role) && <Button onClick={onDelete}>Удалить</Button>}
                    { RULES["tariffs"]["PUT"].includes(user.role) && <Button onClick={toggleEdit}>{status == STATUS.EDIT ? "Сохранить" : "Редактировать"}</Button>}
                    { RULES["tariffs"]["PUT"].includes(user.role) && <Button onClick={handleOpen}>История</Button>}
                </ButtonGroup>
            </Grid>
            <Grid container spacing={6} className={classes.container}>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled id="standard-required" label="ID Тарифа" value={id_tariff}/>
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>                            
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Имя" value={name} 
                        onChange={(event) => dispatch({type: "EDIT", data: {...data, name: event.target.value}})}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>                           
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Платёж(рубли?)" value={payment} 
                        onChange={(event) => {

                            let value = event.target.value
                            if (isNaN(Number(value)))
                                return

                            dispatch({type: "EDIT", data: {...data, payment: event.target.value}})
                        }}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>                            
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Период(миллисекунды?)" value={period} 
                        onChange={(event) => {
                            
                            let value = event.target.value
                            if (isNaN(Number(value)))
                                return

                            dispatch({type: "EDIT", data: {...data, period: event.target.value}})
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Typography display="block" variant="h6">
                    Услуги
                </Typography>   
            </Grid>
            <Grid container justify='center' className={classes.table}> 
                {data && RULES["services"]["GET"].includes(user.role)  &&
                    <Services
                        tariff={data}
                        onServiceSetChange={onServiceSetChange}
                        isEdit={status == STATUS.EDIT}
                    />
                }
            </Grid>
        </Grid>
    )
}

export default tariff