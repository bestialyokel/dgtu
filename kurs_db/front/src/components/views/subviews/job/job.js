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



import Workers from "./workers"
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


const job = (props) => {
    const token = useContext(TokenContext)
    const user = useContext(UserContext)
    let {id} = useParams()
    id = id || 3


    const classes = useStyles()


    const [state, dispatch] = useReducer(reducer, initState)

    const {data, status, error} = state

    const {id_job, id_appeal, description, workers, /*status */} = data || {}

    console.log(id, data)

    const onDelete = () => {
        let url = new URL(`jobs/${id}`, 'http://localhost:8080')
        url.search = new URLSearchParams({key: token})
        fetch(url, {method: 'DELETE'})
        dispatch({type: "DELETE"})
    }

    const toggleEdit = async () => {
        if (status == STATUS.IDLE) {
            dispatch({type: "EDIT", data})
        } else if (status == STATUS.EDIT) {
            let url = new URL(`jobs/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({...data, key: token})
            await fetch(url, {method: 'PUT'})
            url.search = new URLSearchParams({key: token})
            let req = await fetch(url, {method: 'GET'})
            let {job} = await req.json()
            dispatch({type: "IDLE", data: job})
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
        let extractedData = {workers}
        Object.keys(data).forEach(key => extractedData[key] = historyData[key])
        dispatch({type: "EDIT", data: extractedData})
        setDialogOpened(false)
    }

    useEffect(() => {
        ;(async () => {
            try {
                let url = new URL(`jobs/${id}`, 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
                const req = await fetch(url, {method: 'GET'})
                const {job} = await req.json()
                dispatch({type: "IDLE", data: job})
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
                        job={data} 
                        onSelect={handleHistorySelect} 
                    />
                }
            </Dialog>
            <Grid container item xs={12} lg={12} md={12} justify='center' className={classes.buttonsContainer}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    { RULES["jobs"]["DELETE"].includes(user.role) && <Button onClick={onDelete}>Удалить</Button>}
                    { RULES["jobs"]["PUT"].includes(user.role) && <Button onClick={toggleEdit}>{status == STATUS.EDIT ? "Сохранить" : "Редактировать"}</Button>}
                    { RULES["jobs"]["PUT"].includes(user.role) && <Button onClick={handleOpen}>История</Button>}
                </ButtonGroup>
            </Grid>
            <Grid container spacing={6} className={classes.container}>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled id="standard-required" label="ID Работы" value={id_job}/>
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <TextField disabled id="standard-required" label="ID Обращения" value={id_appeal}/>
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>                            {/* какого хуя везде адекватно работает defaultValue
                                                                                                            а здесь только value? эта параша имеет своё состояние.....*/}
                    <TextField disabled={status == STATUS.IDLE} id="standard-required" label="Описание" value={description} 
                        onChange={(event) => dispatch({type: "EDIT", data: {...data, description: event.target.value}})}
                    />
                </Grid>
                <Grid container item xs={12} md={6} lg={3} justify='center'>
                    <FormControl 
                        //className={"none"} 
                        disabled={status == STATUS.IDLE}
                        autoWidth
                    >
                    <InputLabel shrink id="status-label">
                        Статус
                    </InputLabel>
                            <Select
                                fullWidth
                                labelId="status-label"
                                id="status-select"
                                value={data.status}
                                onChange={(event) => dispatch({type: "EDIT", data: {...data, status: event.target.value}})}
                            >
                                <MenuItem value={"o"}>
                                    Открыт
                                </MenuItem>
                                <MenuItem value={"p"}>
                                    Ведутся работы
                                </MenuItem>
                                <MenuItem value={"c"}>
                                    Закрыт
                                </MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Typography display="block" variant="h6">
                    Рабочие
                </Typography>   
            </Grid>
            <Grid container justify='center' className={classes.table}> 
                {data && RULES["workers"]["GET"].includes(user.role)  &&
                    <Workers
                        job={data}
                    />
                }
            </Grid>
        </Grid>
    )
}

export default job