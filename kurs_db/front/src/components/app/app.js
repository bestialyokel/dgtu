import React, { Component, useState, useEffect, useContext, useReducer, createContext } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

import {getCookie, setCookie} from '../../utils/cookieTools'
import MainView from '../common/MainView'
import NavBar from '../common/NavBar'
import Login from '../common/Login'
import {AUTH_STATUS} from '../../utils/constants'
import { UserContext, TokenContext} from '../../context/context'

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
                status: AUTH_STATUS.ERROR,
                error: event.error
            }
        default:
            return state
    }
}

const tokenReducer = (state, event) => {
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
                status: AUTH_STATUS.ERROR,
                error: event.error
            }
        default:
            return state
    }
}

const initialState = {
    status: AUTH_STATUS.CHECKING,
    user: null,
    token: getCookie('key'),
    error: null
}



const App = (props) => {
    const [authState, authDispatch] = useReducer(authReducer, initialState)
    const {user, status, error, token} = authState



    useEffect(() => {
        let canceled = false
        ;(async () => {
            if (status != AUTH_STATUS.CHECKING) return
            try {
                let url = new URL('login', 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
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
        <UserContext.Provider value={user}>
        <TokenContext.Provider value={token}>
            <Router> 
                {/*isLoading && "loading"*/}    
                {status == AUTH_STATUS.AUTHORIZED && <NavBar></NavBar>}
                {status == AUTH_STATUS.UNAUTHORIZED && <Redirect to="/login"></Redirect>}
                <Switch>
                    <Route exact path="/">
                        {status == AUTH_STATUS.AUTHORIZED && <MainView></MainView>}
                    </Route>
                    {/* not login*/}
                    <Route path="/login">
                        <Login setToken={setToken}> 
                        </Login>
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
        </TokenContext.Provider>
        </UserContext.Provider>
    )
        
}



export default App