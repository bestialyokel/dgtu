import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";


import {RULES} from "../../utils/constants"
import { UserContext, TokenContext} from '../../context/context'

const Paths = [
    {
        path: "services",
        title: "services",
        roles: RULES["services"]["GET"]
    },
    {
        path: "tariffs",
        title: "tariffs",
        roles: RULES["tariffs"]["GET"]
    },
    {
        path: "clients",
        title: "clients",
        roles: RULES["clients"]["GET"]
    },
    {
        path: "contracts",
        title: "contracts",
        roles: RULES["contracts"]["GET"]
    },
    {
        path: "appeals",
        title: "appeals",
        roles: RULES["appeals"]["GET"]
    },
    {
        path: "jobs",
        title: "jobs",
        roles: RULES["jobs"]["GET"]
    },
    {
        path: "workers",
        title: "workers",
        roles: RULES["workers"]["GET"]
    },
    {
        path: "dumps",
        title: "dumps",
        roles: RULES["dumps"]["GET"]
    }
]

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5)
    },
    itemContainer: {
        marginBottom: theme.spacing(5)
    },
    item: {
        padding: theme.spacing(1),
        display: "inline-block",
        width: theme.spacing(30),
        borderRadius: theme.spacing(1),
        color: "white",
        textDecoration: "none",
        backgroundColor: "#3f51b5",
        textTransform: "capitalize"
    }
}));

const MainView = (props) => {
    const user = useContext(UserContext)
    const classes = useStyles()
    return (
        <Grid container spacing={1} justify="flex-start" wrap="wrap" className={classes.container}>
            {Paths.filter(x => x.roles.includes(user.role)).map((x,i) => (
                <Grid lg={3} md={6} xs={12} item key={i} className={classes.itemContainer}>
                    <Typography align="center" >
                        <Link to={`/${x.path}`} state={{user: user}} className={classes.item}>
                            {x.title}
                        </Link>
                    </Typography>
                </Grid>
            ))}
        </Grid>
    )
}

export default MainView