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
import {AUTH_STATUS, RULES} from '../../utils/constants'
import { UserContext, TokenContext } from '../../context/context'

import {Appeals, Clients, Contracts, Services, Tariffs, Jobs, Workers} from "../views"
import {Appeal, Client, Contract, Service, Tariff, Job, Worker} from "../views/subviews"


const authReducer = (state, event) => {
    switch(event.type) {
        case "CHECK":
            return {
                ...state,
                status: AUTH_STATUS.CHECKING
            }
        case "REJECT":
            return {
                ...state,
                status: AUTH_STATUS.UNAUTHORIZED,
            }
        case "LOGGED":
            return {
                ...state,
                status: AUTH_STATUS.AUTHORIZED,
                user: event.data
            }
        case "LOGIN":
            setCookie('session-key', event.token)
            return {
                ...state,
                status: AUTH_STATUS.UNAUTHORIZED,
                token: event.token,
            }
            break;
        case "LOGOUT":
            setCookie('session-key', String()) 
            return {
                ...state,
                status: AUTH_STATUS.UNAUTHORIZED,
                token: String(),
                user: null,
            }
            break;
        case "ERROR": 
            return {
                ...state,
                status: AUTH_STATUS.UNAUTHORIZED,
                error: event.error
            }
        default:
            return state
    }
}

const authInitialState = {
    status: AUTH_STATUS.CHECKING,
    user: null,
    error: null,
    token: getCookie('session-key')
}

const App = (props) => {
    const [authState, authDispatch] = useReducer(authReducer, authInitialState)
    const {user, status, error, token} = authState

    const isLoading = [status == AUTH_STATUS.CHECKING,].includes(true)

    const setToken = (token) => {
        authDispatch({type: "LOGIN", token: token})
        authDispatch({type: 'CHECK'})
    }

    const logOut = () => authDispatch({type: "LOGOUT"})

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
                    authDispatch({type: "LOGGED", data: user})
                else 
                    authDispatch({type: "REJECT"})
            } catch(error) {
                if (canceled) return
                authDispatch({type: "ERROR", error})
            }

        })()
        return () => canceled = true
    }, [status])

    return (
        <UserContext.Provider value={user}>
        <TokenContext.Provider value={token}>
            <Router> 
                {isLoading && "loading"}
                {status == AUTH_STATUS.AUTHORIZED && <NavBar logOut={logOut} ></NavBar>}
                {status == AUTH_STATUS.UNAUTHORIZED && <Redirect to="/login"></Redirect>}
                <Switch>
                    {/* если вложить в Fragment, то не доходит до * почему-то */}
                    {status == AUTH_STATUS.AUTHORIZED &&
                        [   
                            <Route exact path="/">
                                <MainView></MainView>
                            </Route>,
                            
                            RULES["services"]["GET"].includes(user.role) &&
                            <Route exact path="/services">
                                <Services/>
                            </Route>,
                                RULES["services"]["GET"].includes(user.role) &&
                                <Route path="/services/:id"><Service/></Route>,
                            
                            RULES["tariffs"]["GET"].includes(user.role) &&
                            <Route exact path="/tariffs">
                                <Tariffs/>
                            </Route>,
                                RULES["tariffs"]["GET"].includes(user.role) &&
                                <Route path="/tariffs/:id"><Tariff/></Route>,
                            
                            RULES["clients"]["GET"].includes(user.role) &&
                            <Route exact path="/clients">
                                <Clients/>
                            </Route>,
                                RULES["clients"]["GET"].includes(user.role) &&
                                <Route path="/clients/:id"><Client/></Route>,

                            RULES["contracts"]["GET"].includes(user.role) &&
                            <Route exact path="/contracts">
                                <Contracts/>
                            </Route>,
                                RULES["contracts"]["GET"].includes(user.role) &&
                                <Route path="/contracts/:id"><Contract/></Route>,

                            RULES["appeals"]["GET"].includes(user.role) &&
                            <Route exact path="/appeals">
                                <Appeals></Appeals>
                            </Route>,
                                RULES["appeals"]["GET"].includes(user.role) &&
                                <Route path="/appeals/:id"><Appeal/></Route>,

                            RULES["jobs"]["GET"].includes(user.role) &&
                            <Route exact path="/jobs">
                                <Jobs/>
                            </Route>,
                                RULES["jobs"]["GET"].includes(user.role) &&
                                <Route path="/jobs/:id"><Job/></Route>,

                            RULES["workers"]["GET"].includes(user.role) &&
                            <Route exact path="/workers">
                                <Workers/>
                            </Route>,
                                RULES["workers"]["GET"].includes(user.role) &&
                                <Route path="/workers/:id"><Worker/></Route>,
                                <Route path="/test"><Tariff/></Route>,
                        ]
                    }
                    {/* not login*/}
                    <Route path="/login">
                        {status == AUTH_STATUS.AUTHORIZED && <Redirect to="/"/>}
                        <Login setToken={setToken}/>
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