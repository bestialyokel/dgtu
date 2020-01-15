import React, { Component, useState, useEffect } from "react";
import getCookie from '../tools/getcookie'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import Clients from './tables/Clients'
import Contracts from './tables/Contracts'
import Appeals from './tables/Appeals'
import Services from './tables/Services'
import Tariffs from './tables/Tariffs'
import Jobs from './tables/Jobs'
import Workers from './tables/Workers'
import Login from './Login'

import Lobtn from './Logoutbutton'




const _Tabs = [
    {title: 'clients', component: Clients, roles: ['a']}, 
    {title: 'contracts', component: Contracts, roles: ['a']}, 
    {title: 'appeals', component: Appeals, roles: ['a', 't']},
    {title: 'services', component: Services, roles: ['d']},    
    {title: 'tariffs', component: Tariffs, roles: ['a', 'd']},
    {title: 'workers', component: Workers, roles: ['t']},
    {title: 'jobs', component: Jobs, roles: ['t']}
]

const App = (props) => {
    const [isLoading, setLoading] = useState(true)
    const [key, setKey] = useState(getCookie('key'))
    const [user, setUser] = useState(null)
    const [tabIndex, setTabIndex] = useState(0)
    const handleChange = (event, value) => setTabIndex(value)
    
    const handleLogout = async () => {
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
    }

    useEffect(() => {
        (async () => {
            console.log('key refresh')
            let url = new URL('login', 'http://localhost:8080')
            url.search = new URLSearchParams({
                key: key
            })
            const req = await fetch(url, {
                method: 'GET'
            })
            const json = await req.json()
            setLoading(false)
            if (json.success) {
                setUser({
                    id: json.userid,
                    role: json.role
                })
            }
            
        })()
        return () => {console.error('app razeban')}
    }, [key])




    if (isLoading)
        return <p>...loading</p>

    if (user == null)
        return <Login setKey={setKey} setLoading={setLoading}/>

    let UserAvailableTabs = _Tabs.filter(tab => tab.roles.includes(user.role))
    const TabView = UserAvailableTabs[tabIndex].component
    return (
        <div>
            <AppBar position="static">
                <Tabs variant={'fullWidth'} value={tabIndex} onChange={handleChange} aria-label="simple tabs example">
                    {UserAvailableTabs.map((x, i) => (<Tab key={i} label={x.title}/>))}
                    <Lobtn onClick={handleLogout} style={{float: 'right'}}>
                            logout
                    </Lobtn>
                </Tabs>
            </AppBar>
            <TabView user={user}/>  
        </div>
    )

}

export default App;