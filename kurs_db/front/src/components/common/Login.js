import React, {useState, useEffect} from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'

import {getCookie, setCookie} from '../utils/cookieTools'
import { useHistory, Redirect} from 'react-router-dom';

const classes = theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1)
    }
});

const Login = (props) => {
    const {user} = props
    const history = useHistory()
    const [fields, setFields] = useState({
        login: '',
        password: ''
    })
    let canceled = false

    useEffect(() => {
        return () => canceled = true
    }, [])


    const tryLogin = async () => {
        let url = new URL('login', 'http://localhost:8080')
        url.search = new URLSearchParams({
            login: fields.login,
            password: fields.password
        })
        const req = await fetch(url, {
            method: 'POST'
        })
        const {key} = await req.json()
        if (json.key) {
            if (canceled) return
            setCookie('key', key)
            history.push("/")
        } else 
            setFields({
                login: '',
                password: ''
            })
    }
           

    if (user != null)
        return (
            <Redirect to="/"/>
        )

    return (
        <Paper className={classes.padding}>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField value={fields.login} onChange={event => setFields({login: event.target.value, password: fields.password}) } id="username" label="Username" type="email" fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField value={fields.password} onChange={event => setFields({password: event.target.value, login: fields.login} )} id="username" label="Password" type="password" fullWidth required />
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button onClick={tryLogin} variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                </Grid>
            </div>
        </Paper>
    );
}

export default withStyles(classes)(Login);