import React, {useState} from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import getCookie from '../tools/getcookie';
const styles = theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1)
    }
});

const LoginTab = (props) => {
    const { classes, setKey, setLoading } = props

    const [fields, setFields] = useState({
        login: '',
        password: ''
    })


    const checkLogin = async () => {
        let url = new URL('login', 'http://localhost:8080')
        url.search = new URLSearchParams({
            login: fields.login,
            password: fields.password
        })
        const req = await fetch(url, {
            method: 'POST'
        })
        const json = await req.json()
        setLoading(true)
        document.cookie = `key=${json.key}`
        setKey(json.key)
        
    }


    return (
        <Paper className={classes.padding}>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField onChange={event => setFields({login: event.target.value, password: fields.password}) } id="username" label="Username" type="email" fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField onChange={event => setFields({password: event.target.value, login: fields.login} )} id="username" label="Password" type="password" fullWidth required />
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button onClick={checkLogin} variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                </Grid>
            </div>
        </Paper>
    );
}

export default withStyles(styles)(LoginTab);