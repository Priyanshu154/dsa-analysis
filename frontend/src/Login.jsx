import React from 'react'
import req from './api_req'

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import {fetch_tags,fetch_problems,fetch_user,filter} from './codeforces_interact'
import {Username,Password,Mid_box} from './Signin_components'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: "auto",
        width: '40ch',
      },
    },
    root2: {
      '& > *': {
        margin: theme.spacing(1),
        width: '15ch',
        height: '5ch',
      },
    },
  }));
function Login(props){
    const classes= useStyles();
    let errors;
    if(props.error !== undefined && props.error !== "" ){
        
        console.log( props.error )
        errors = JSON.parse( props.error )
        console.log( errors )
    }
    console.log( errors )
    return (
        <>
        <Mid_box csrf = {props.csrf} action = "./login" form_type = "Log in" h = {props.h}>   
            <Username error={ errors}></Username>
            <Password id="password" naam='Password' label_width={ 70} error={ errors}
                styles={ {width: "80%", paddingLeft: "10%", paddingRight: "10%", paddingBottom: "0%",}}
          
            /> 
            <div style={ {width: "80%", paddingLeft: "10%", paddingRight: "10%", paddingBottom: "0%",}}>
                <p style={ {color: "black"}}>Don't have an account? <a href='/register'>Register</a></p>
            </div>
            <Box className={classes.root2} textAlign='center'>
                <Button variant="contained" color="primary" type="submit">Log in</Button>
            </Box>
        </Mid_box>
        </>
    )

}

export default Login