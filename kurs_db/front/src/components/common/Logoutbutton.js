
import React, {useState} from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default (props) => {
    const classes = useStyles();

    const {children} = props

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<ExitToAppIcon/>}
                {...props}
            >
                {children}
            </Button>
        </div>
    )
}

