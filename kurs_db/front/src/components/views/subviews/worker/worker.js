import { useParams, Redirect, Link } from "react-router-dom"
import React from "react"


import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { TextField, ButtonGroup, Button, Typography, Dialog, MenuItem, FormControl, InputLabel, Select } from "@material-ui/core"
import { useReducer } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { UserContext, TokenContext } from "../../../../context/context"




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


const worker = (props) => {
    const token = useContext(TokenContext)
    const user = useContext(UserContext)
    let {id} = useParams()

    id = id || 1 // test

    const classes = useStyles()

    const [state, dispatch] = useReducer(reducer, initState)

    const {data, status, error} = state
    
    const {id_worker, id_job, name, surname, patronymic, skills} = data || {}

    console.log(data)

    const onDelete = () => {
        let url = new URL(`workers/${id}`, 'http://localhost:8080')
        url.search = new URLSearchParams({key: token})
        fetch(url, {method: 'DELETE'})
        dispatch({type: "DELETE"})
    }

    const onHistory = () => {}

    const toggleEdit = async () => {
        if (status == STATUS.IDLE) {
            dispatch({type: "EDIT", data})
        } else if (status == STATUS.EDIT) {
            let url = new URL(`workers/${id}`, 'http://localhost:8080')
            console.log("eto data::", data)
            url.search = new URLSearchParams({...data, key: token})
            await fetch(url, {method: 'PUT'})
            url.search = new URLSearchParams({key: token})
            let req = await fetch(url, {method: 'GET'})
            let {worker} = await req.json()
            dispatch({type: "IDLE", data: worker})
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
        let extractedData = {}
        Object.keys(data).forEach(key => extractedData[key] = historyData[key])
        dispatch({type: "EDIT", data: extractedData})
        setDialogOpened(false)
    }

    useEffect(() => {
        ;(async () => {
            try {
                let url = new URL(`workers/${id}`, 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
                const req = await fetch(url, {method: 'GET'})
                const {worker} = await req.json()
                dispatch({type: "IDLE", data: worker})
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
                        worker={data} 
                        onSelect={handleHistorySelect} 
                    />
                }
            </Dialog>
            <Grid container item xs={12} lg={12} md={12} justify='center' className={classes.buttonsContainer}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    { RULES["workers"]["DELETE"].includes(user.role) && <Button onClick={onDelete}>Удалить</Button>}
                    { RULES["workers"]["PUT"].includes(user.role) && <Button onClick={toggleEdit}>{status == STATUS.EDIT ? "Сохранить" : "Редактировать"}</Button>}
                    { RULES["workers"]["PUT"].includes(user.role) && <Button onClick={handleOpen}>История</Button>}
                </ButtonGroup>
            </Grid>
            <Grid container spacing={6} className={classes.container}>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled id="standard-required" label="ID работника" defaultValue={id_worker}/>
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <FormControl
                        //className={"none"} 
                        disabled={status == STATUS.IDLE || Number(id_job) == 0}
                        autoWidth
                    >
                    <InputLabel shrink id="status-label">
                        Работа
                    </InputLabel>
                            <Select
                                fullWidth
                                labelId="status-label"
                                id="status-select"
                                value={id_job || 0}
                                onChange={(event) => dispatch({type: "EDIT", data: {...data, id_job: event.target.value}})}
                            >
                                <MenuItem value={id_job}>
                                    {id_job}
                                </MenuItem>
                                <MenuItem value={0}>
                                    Работа не назначена
                                </MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Имя" value={name}
                        onChange={(event) => dispatch({type: "EDIT", data: {...data, name: event.target.value}})}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Фамилия" value={surname} 
                        onChange={(event) => dispatch({type: "EDIT", data: {...data, surname: event.target.value}})}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Отчество" value={patronymic} 
                        onChange={(event) => dispatch({type: "EDIT", data: {...data, patronymic: event.target.value}})}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField  disabled={status == STATUS.IDLE} id="standard-required" label="Навыки" value={skills}
                        onChange={(event) => dispatch({type: "EDIT", data: {...data, skills: event.target.value}})}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default worker