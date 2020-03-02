import React, {useState} from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import getCookie from '../../tools/tokenTools';
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


    const tryLogin = async () => {
        let url = new URL('login', 'http://localhost:8080')
        url.search = new URLSearchParams({
            login: fields.login,
            password: fields.password
        })
        const req = await fetch(url, {
            method: 'POST'
        })
        const json = await req.json()
        document.cookie = `key=${json.key}`
        if (json.key) {
            setLoading(true)
            setKey(json.key)
        } else 
            setFields({
                login: '',
                password: ''
            })
    }
           


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

export default withStyles(styles)(LoginTab);