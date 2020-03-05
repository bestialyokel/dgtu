import React, {useEffect} from 'react';
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


import {setCookie, getCookie} from '../utils/cookieTools'
import { useHistory } from 'react-router-dom';


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
}));



export default function MenuAppBar(props) {
    const {user} = props
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory()
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };
    let canceled = false

    useEffect(() => {
        return () => canceled = true
    }, [])


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = async () => {
        let url = new URL('login', 'http://localhost:8080')
        url.search = new URLSearchParams({key: getCookie('key')})
        const req = await fetch(url, {
            method: 'DELETE'
        })
        const {success} = await req.json()
        if (canceled) return
        setCookie(key, '')
        history.push("/login")
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    я не дизайнер
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