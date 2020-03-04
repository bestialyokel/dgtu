import React, { Component, useState, useEffect, useContext, useReducer } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

import {getCookie, setCookie} from '../utils/cookieTools'
import MainView from '../common/MainView'
import NavBar from '../common/NavBar'
import {AUTH_STATUS} from '../utils/constants'

const authReducer = (state, event) => {
    switch(event.type) {
        case "FETCH":
            return {
                ...state,
                status: AUTH_STATUS.CHECKING
            }
        case "RESOLVE":
            return {
                ...state,
                status: AUTH_STATUS.AUTHORIZED,
                user: event.data
            }
        case "REJECT":
            return {
                ...state,
                status: AUTH_STATUS.UNAUTHORIZED,
            }
        case "ERROR": 
            return {
                ...state,
                error: event.error
            }
        default:
            return state
    }
}

const initialState = {
    status: AUTH_STATUS.CHECKING,
    user: null,
    error: null
}

const App = (props) => {
    const key = getCookie('key') || 'f376434a41c97e65'
    const [authState, authDispatch] = useReducer(authReducer, initialState)
    const {user, status, error} = authState

    useEffect(() => {
        let canceled = false
        ;(async () => {
            if (status != AUTH_STATUS.CHECKING) return
            try {
                let url = new URL('login', 'http://localhost:8080')
                url.search = new URLSearchParams({key})
                const req = await fetch(url)
                const {success, user} = await req.json()
                if (canceled) return
                if (success) 
                    authDispatch({type: "RESOLVE", data: user})
                else 
                    authDispatch({type: "REJECT"})
            } catch(error) {
                if (canceled) return
                authDispatch({type: "ERROR", error})
            }

        })()
        return () => canceled = true
    }, [status])
    
    let isLoading = [status == AUTH_STATUS.CHECKING,].includes(true)

    return (
        <Router>       
            <Switch>
                
                <Route exact path="/">
                    {status == AUTH_STATUS.UNAUTHORIZED && <Redirect to="/login"/>}
                    {!isLoading ? <NavBar user={user} ></NavBar> : "loading"}
                </Route>
                {/* not login*/}
                <Route path="/login">
                    <p>login</p>
                </Route>
                <Route path="/services">
                    <p>services</p>
                </Route>
                <Route path="/tariffs">
                    <p>tariffs</p>
                </Route>
                <Route path="/clients">
                    <p>clients</p>
                </Route>
                <Route path="/contracts">
                    <p>contracts</p>
                </Route>
                <Route path="/appeals">
                    <p>appeals</p>
                </Route>
                <Route path="/jobs">
                    <p>jobs</p>
                </Route>
                <Route path="/workers">
                    <p>workers</p>
                </Route>
                {/*
                        ---> * always match
                */}
                <Route path="*">
                    <p>nomatch</p>
                </Route>
            </Switch>
        </Router>
    )
        
}



export default App