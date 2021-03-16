import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'; 
import { Toolbar } from '@material-ui/core';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
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

function UserButton(props){
  return(
    <>
    <span style={{marginRight: props.right_margin}}>
      <Button color={props.colour} size="small" variant = "contained" href= {props.href}>
            <Typography variant ="button">{props.text}</Typography></Button>
    </span> 
    </>
  )
}


function NavBar(props){
    const classes = useStyles();
    let buttons = [];
    if( props.userLoggedIn ){
      buttons.push(
        <UserButton 
              colour="secondary"
              text = "Logout"
              href = "/logout"/>
      );
    }
    else{
      buttons.push(
        <UserButton 
              colour="secondary"
              right_margin = "1%"
              text = "Sign-up"
              href = "/register"/>
      )
      buttons.push(
        <UserButton 
              colour="primary"
              text = "Login"
              href = "/login"/>
      )
      
    }
    return (
        <>
        <AppBar position="static" style={ { background: "#303030" ,minHeight:props.h }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}> DSA Weakness Analysis </Typography>
            <span style = {{marginRight: "2vw"}}>
              {props.userLoggedIn ? 
                <><Typography variant="body1">Hi, {props.username}</Typography>  </>
                :<></>
              }
              </span>
            {buttons}
          </Toolbar>
        </AppBar>   
        </>

    )
}  
export default NavBar