import React, {useEffect, useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import {setCookie, getCookie} from '../../utils/cookieTools'
import { useHistory } from 'react-router-dom';
import { UserContext, TokenContext} from '../../context/context'

import {Link} from "react-router-dom"


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    }
}));



export default function MenuAppBar(props) {
    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const classes = useStyles()
    const { logOut } = props
    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)
    const handleMenu = event => setAnchorEl(event.currentTarget)

    let canceled = false
    // prevent fetch mut.
    useEffect(() => () => canceled = true, [])


    const handleClose = () => setAnchorEl(null)

    const handleLogOut = async () => {
        let url = new URL('login', 'http://localhost:8080')
        url.search = new URLSearchParams({key: token})
        try {
            const req = await fetch(url, {method: 'DELETE'})
            const {success} = await req.json()
            if (success) logOut()
            else throw "owibka"
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link className={classes.link} to="/">я не дизайнер</Link>
                </Typography>
                <div>
                    <Typography display="inline" variant="h6" className={classes.title}>
                        {user.login}
                    </Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        elevation={0}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 0,
                            horizontal: -40,
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}