import React from 'react'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
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
    grid_style: {
        minHeight: 90 + 'vh',
     
    },
    responsive_widths:{
        [theme.breakpoints.down('360')]: {
            maxWidth: '80%',
        },
    }
  }));
const FieldStyle = {
    width: "80%",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingBottom: "5%",
};
function Password( props  ){
    const [pass1, setPass1] = React.useState('')
    const [showpass, setShow]  = React.useState( false )
    const handleChange = (event) => {
        setPass1( event.target.value  );
    };
    function handleShow(event){
        setShow( showpass ? false:true );
    }
    function handleMouseDownPassword(event){
        event.preventDefault();
    }
    let errors = {
        status : false,
        text: ''
    }
    if(props.error){
        if(props.error.password1 || props.error.password2){
            errors.status = true
            errors.text =  ( props.error.password1 ? props.error.password1 : props.error.password2 )[0].message
        }
    }
    return(
        <>
        <div style={ props.styles? props.styles : FieldStyle}>
            <FormControl error={ errors.status} fullWidth variant="outlined">
                <InputLabel htmlFor={props.id}>{props.naam}</InputLabel>
                <OutlinedInput id={props.id} required name={ props.id} type={showpass ? 'text' : 'password'} value={pass1} onChange={handleChange} endAdornment={ <InputAdornment position="end">
                    <IconButton style={{tabindex:-1}} aria-label="toggle password visibility" onClick={handleShow} onMouseDown={handleMouseDownPassword} edge="end"> 
                        {showpass ?  <Visibility /> :<VisibilityOff />} 
                    </IconButton>
                    </InputAdornment> } labelWidth={props.label_width}/>
                    <FormHelperText id="component-error-text">{errors.text}</FormHelperText>
            </FormControl>
        </div>
     
        </>
    );
}
function Username(props){
    let error = {
        status: false,
        text: ''
    }
    if( props.error ){
         if(props.error.username){
            error.status = true;
            error.text = props.error.username[0].message
        }
    }
    return (
        <>
        
        <div style={ FieldStyle}>
            <FormControl error = {error.status}  fullWidth variant = "outlined">
                <TextField error = {error.status} required fullWidth id="username" label="Username" variant="outlined" name = "username"/>        
                <FormHelperText id="component-error-text">{error.text}</FormHelperText>
            </FormControl>
        </div>
        </>
    );
}

function Mid_box(props){
    console.log(props.h)
    const classes = useStyles();
    return (
        <>
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" className = {classes.grid_style}>
            <form className={ classes.root} style={ {width: "100%"}}action={props.action} method="post">
            <input type="hidden" name="csrfmiddlewaretoken" value={props.csrf}></input>
        
                <Box boxShadow={3} bgcolor="white" borderRadius={10} m={1} p={1} className = {classes.responsive_widths}>
                    <h1 style={ {color : "black", textAlign : "center", }}>{props.form_type}</h1>
                    <div style={ { paddingTop: "5%", paddingBottom: "5%" }}>
            
                        {props.children}
                    </div>
                </Box>
            </form>
        </Grid>
        </>
    );   
}

export { Mid_box, Password, Username }