import React from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import {Mid_box,Username, Password } from './Signin_components'
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
function Register(props){
   
   
    const classes = useStyles();
    let errors;
    if(props.error !== undefined && props.error !== "" ){
        
        console.log( props.error )
        errors = JSON.parse( props.error );
        console.log( errors )
    }
    console.log( errors )
    return (
      
        
    <>
        <Mid_box h = {props.h} csrf = {props.csrf} action = "./register" form_type = "Sign up">   
            <Username error={ errors}></Username>
            <Password id="password1" naam='Password' label_width={ 70} error={ errors}/> 
            <Password id="password2" naam='Password Again' label_width={120} error={ errors} 
                    styles={ {width: "80%", paddingLeft: "10%", paddingRight: "10%", paddingBottom: "0%",}}
            />
            <div style={ {width: "80%", paddingLeft: "10%", paddingRight: "10%", paddingBottom: "0%",}}>
                <p style={ {color: "black"}}>Already have an account? <a href='/login'>Login</a></p>
            </div>
            <Box className={classes.root2} textAlign='center'>
                <Button variant="contained" color="primary" type="submit">Register</Button>
            </Box>
        </Mid_box>
    {/* </form> */}
    </>

    )    
}
export default Register 
export {Password}