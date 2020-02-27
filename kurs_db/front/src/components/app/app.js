import React, { Component, useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import getCookie from '../../tools/getcookie'
import rules from '../../tools/rules'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



import Clients from '../tables/Clients'
import Contracts from '../tables/Contracts'
import Appeals from '../tables/Appeals'
import Services from '../tables/Services'
import Tariffs from '../tables/Tariffs'
import Jobs from '../tables/Jobs'
import Workers from '../tables/Workers'
import Login from '../common/Login'

import Lobtn from '../common/Logoutbutton'




const UserTabs = [
    {title: 'clients', component: Clients}, 
    {title: 'contracts', component: Contracts}, 
    {title: 'appeals', component: Appeals},
    {title: 'services', component: Services},    
    {title: 'tariffs', component: Tariffs},
    {title: 'workers', component: Workers},
    {title: 'jobs', component: Jobs}
]

const App = (props) => {
    const [isLoading, setLoading] = useState(true)
    const [key, setKey] = useState(getCookie('key'))
    const [user, setUser] = useState(null)
    const [tabIndex, setTabIndex] = useState(0)
    

    
    /*const handleLogout = async () => {
        let url = new URL('login', 'http://localhost:8080')
        url.search = new URLSearchParams({
            key: key
        })
        const req = await fetch(url, {
            method: 'DELETE'
        })
        const json = await req.json()
        setKey(null)
        setUser(null)
        document.cookie = 'key='
    }*/

    useEffect(() => {
        (async () => {
            let url = new URL('login', 'http://localhost:8080')
            url.search = new URLSearchParams({key})
            const req = await fetch(url)
            const json = await req.json()
            console.log(json)
            setLoading(false)
            if (json.success) {
                setUser({
                    id: json.userid,
                    role: json.role
                })
                document.cookies = `key=${json.key`
            }
            
        })()
        return () => {}
    }, [key])




    if (isLoading)
        return <p>...loading</p>

    if (user == null)
        return <Login setKey={setKey} setLoading={setLoading}/>

    
    const AvailableTabs = UserTabs.filter(tab => rules[tab.title]["GET"].includes(user.role))
    const CurrentTab = UserTabs[tabIndex]

    return (
        <Router>
            <div>
                <AppBar position="static">
                    <Tabs variant={'fullWidth'} value={tabIndex} onChange={(event, value) => setTabIndex(value)} aria-label="simple tabs example">
                        {AvailableTabs.map(
                            (tab, index) => (<Tab key={index} label={tab.title}/>)
                        )}
                        <Lobtn onClick={handleLogout} style={{float: 'right'}}>
                                logout
                        </Lobtn>
                    </Tabs>
                </AppBar>
                <CurrentTab role={user.role}/>
            </div>

            <Switch>
                {AvailableTabs.map(
                    (tab) => {
                        return (
                            <Route path={`/${tab.title}`}>
                                <Tab.component role={user.role}/>
                            </Route>
                        )
                    }
                )}
            </Switch>
        </Router>
    )

}

export default App;