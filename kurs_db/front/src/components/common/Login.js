import React, {useState, useEffect, useContext} from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'


import { useHistory, Redirect} from 'react-router-dom';
import { UserContext, TokenContext } from '../../context/context'

const classes = theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1)
    }
});

const Login = (props) => {
    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const {setToken} = props
    const history = useHistory()
    const [fields, setFields] = useState({login: String(), password: String()})
    const {login, password} = fields

    let canceled = false
    useEffect(() => {
        return () => canceled = true
    }, [])


    const tryLogin = async () => {
        let url = new URL('login', 'http://localhost:8080')
        url.search = new URLSearchParams({login, password})
        try {
            const req = await fetch(url, {method: 'POST'})
            const {key} = await req.json()
            if (!key) throw "wrong auth params"
            if (canceled) return
            setCookie('token', key)

        } catch(error) {
            console.log(error)
            setFields({login: String(), password: String()})
        }
    }
           

    if (user) return <Redirect to="/"/>
        

    return (
        <Paper className={classes.padding}>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField value={login} onChange={event => setFields({login: event.target.value, password}) } id="username" label="Username" type="email" fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField value={password} onChange={event => setFields({password: event.target.value, login} )} id="username" label="Password" type="password" fullWidth required />
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