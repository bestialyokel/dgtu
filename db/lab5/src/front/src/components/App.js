import React, { Component, useState, useEffect } from "react";
import getCookie from '../tools/getcookie'
import {makeStyles} from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



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

    const [isLoading, setLoading] = useState(true)
    const [isLogged, setLogged] = useState(false)

    const testGet = async () => {
        fetch('https://2ip.ru', {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                console.log(json);
                });
            }
            });
    }

    useEffect( () => {
        testGet()
    }, [])




    const [tabIndex, setTabIndex] = useState(0)
    const handleChange = (event, value) => setTabIndex(value)



    return (
        <div /*className={classes.app}*/>
            <AppBar position="static">
                <Tabs value={tabIndex} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Clients" />
                    <Tab label="Item Two"/>
                    <Tab label="Item Three"/>
                </Tabs>
            </AppBar>
            123
        </div>
    )

}

export default App;