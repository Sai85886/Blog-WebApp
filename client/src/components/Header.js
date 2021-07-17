import React from 'react'
import {AppBar,Toolbar,Typography,makeStyles} from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles=makeStyles({
    component:{
        background:'#FFFFFF',
        color:'black'
    },
    inputtext:{
        background:"lightblue",
        padding:10,
        borderRadius:5,
        marginRight:5,
        marginLeft:5
    },
    container:{
        justifyContent:'center',
        '&>*':{
            
        }
    },
    link:{
        textDecoration:'none',
        color:'inherit'
    }
})
const Header = () => {
    const classes=useStyles();
    return (
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Link to='/' className={classes.link}>
                    <Typography className={classes.inputtext}>HOME</Typography>
                </Link>
                <Typography className={classes.inputtext}>ABOUT</Typography>
                <Typography className={classes.inputtext}>CONTACT</Typography>
                <Typography className={classes.inputtext}>LOGIN</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
