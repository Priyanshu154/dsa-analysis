import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { fetch_problems,fetch_tags, fetch_user,filter } from './codeforces_interact'

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import useMediaQuery from '@material-ui/core/useMediaQuery';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '35ch',
      },
    },
    root2: {
      '& > *': {
        margin: theme.spacing(1),
        width: '15ch',
        height: '5ch',
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    loading:{
        color: "#3dc6fc"
    },
    responsive_widths:{
      [theme.breakpoints.down('350')]: {
          maxWidth: '80%',
      },
    }
 }));

var ans;

function Ci() {
  const [handle,sethandle] = useState("");
  const [handleid,sethandleid] = useState("");
  let [back_drop_enabled,ToggleDrop] = useState(false)
  let [dialog_status, setDialog] = useState( false)
  function handleClose_dialog(){
    setDialog(false)
    ToggleDrop( false )
  }
  const history = useHistory();
  function handleupdate(e){
    sethandle(e.target.value);
    console.log({handle});
  }
  async function onSubmits(e){
    e.preventDefault();
    sethandleid(handle);
    ToggleDrop(true);
    let found = true;
    let user = await fetch_user( handle )
    let max_que_per_tag = 10;
    let rating_range = +400;
    if( user === undefined ){
      found = false;
    }
    else{
      let tags = await fetch_tags( handle )
      if(tags===undefined)  found= false;  
      else{
        let problems = await fetch_problems( filter(tags), user.rating, rating_range , max_que_per_tag )
        if( problems === undefined || problems.length === 0) found = false;
        else{
          ans = problems
          history.push({
            pathname: '/dsa',
            state: { problems: ans } 
          })
        }
      }
    }
    if( !found ){
      //Manually enter tags
      setDialog(true);
      // history.push({
        // pathname: '/tags',
      // })
    }    
    console.log(handleid);
  }
  const classes = useStyles();
  return (
    <>
        <Grid container spacing={0} direction="column" alignItems="center"
        justify="center" style={{ minHeight: '90vh'}}>
          <Box item xs={5} boxShadow={3} bgcolor="background.paper" borderRadius={10}
          m={1} p={1} className = {classes.responsive_widths}>
              
            <h2 style={{textAlign: "center",}}>Enter Codeforces Handle ID</h2>
            <form className={classes.root} noValidate autoComplete="off"
             onSubmit={onSubmits}>
              <TextField id="outlined-basic" label="HandleID" style ={{maxWidth: "90%"}}
              variant="outlined" value={handle} onChange={handleupdate}/>
            
            <Box className={classes.root2} textAlign='center' style = {{maxWidth: "90%"}}>
              <Button variant="contained" color="primary" type="submit"
                onClick = { async (e) => { await onSubmits(e) }  }>
                  Submit
              </Button>              
            </Box>
            </form>
            <Box m={3} textAlign='center'>
              <Button variant="contained" color="secondary" href = "/tags">
                Choose Tags Manually
              </Button>
            </Box>

          </Box>      
        </Grid>
        <Backdrop className={classes.backdrop} open={back_drop_enabled}>
          <CircularProgress className = {classes.loading} size = {80} thickness = {35} color="inherit" />
        </Backdrop>
        <Dialog
        open={dialog_status}
        onClose={handleClose_dialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"OOPS, something went wrong :("}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            There was a problem fetching the contest history of given user ID, either type Handle ID again or select tags manually 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
              
          <Button onClick={handleClose_dialog} color="primary">
            Enter ID again
          </Button>
          <Button href = "/tags" variant="contained" color="primary">
            Select tags manually
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Ci;
export {ans};