import React, { Component, useState, useEffect } from "react";
import getCookie from '../tools/getcookie'

import {CircularProgress} from '@material-ui/core'

import {makeStyles} from '@material-ui/styles'

import Login from './Login'

const useStyles = makeStyles({
    app: {
        width: '100%',
        margin: 'auto auto',
        verticalAlign: 'middle',
        textAlign: 'center',
        height: '100%'
    }
})

const App = () => {
    const classes = useStyles();
    const [key, setKey] = useState(getCookie('key'))

    return (
        <div className={classes.app}>
            <CircularProgress/>
        </div>
    )

}

export default App;