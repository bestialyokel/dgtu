import React, { Component, useState, useEffect } from "react";
import getCookie from '../tools/getcookie'
import {makeStyles} from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


//mycomponents
import Clients from './tables/clients'


/*const useStyles = makeStyles({
    app: {
        width: '100%',
        margin: 'auto auto',
        verticalAlign: 'middle',
        textAlign: 'center',
        height: '100%'
    }
})*/

const _Tabs = [
    {title: 'clients', component: Clients}, 
    {title: 'a', component: Clients}, 
    {title: 'a', component: Clients},
    {title: 'a', component: Clients},    
    {title: 'a', component: Clients},
    {title: 'a', component: Clients},
]

const App = (props) => {
    //const classes = useStyles();
    const [key, setKey] = useState(getCookie('key'))

    const [state, setState] = useState('loading')


    const [tabIndex, setTabIndex] = useState(0)
    const handleChange = (event, value) => setTabIndex(value)

    const TabView = _Tabs[tabIndex].component


    return (
        <div /*className={classes.app}*/>
            <AppBar position="static">
                <Tabs value={tabIndex} onChange={handleChange} aria-label="simple tabs example">
                    {_Tabs.map((x, i) => (<Tab key={i} label={x.title}/>))}
                </Tabs>
            </AppBar>
            <TabView/>  
        </div>
    )

}

export default App;