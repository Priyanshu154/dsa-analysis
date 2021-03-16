import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { useHistory } from 'react-router-dom';
import {fetch_problems} from './codeforces_interact';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import tag_list from './Tag_list'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    sel : {
        background: "black",
        color:  "white"
    }
  }));

function Tag( props ){
    const classes = useStyles();
    const [show, setShow] = React.useState( "block" );
    let options_html = [];
    const [tag_value , set_value] = React.useState( props.tag );
    function remove_it(event){
          setShow( "none" )
          set_value( "" )
          props.handleChange( event, true )
      }
    function assign_new(event){
        set_value( event.target.value )
        props.handleChange( event,false )
    }
    for(let tag of tag_list){
        options_html.push(
            <>
                <option value={tag.value}>{tag.display}</option>
            </>
        )
    }
    return (
    <>
    <div style = {{ display :show }}>
        <Select 
        native
        value={tag_value}
        onChange={assign_new}
        inputProps={{
            tags: 'tags'
        }}style = {{maxWidth: "80%"}}
        
        >
        <option value="" disabled>Select Tag</option>
        {options_html}
        </Select>
        {/* <span display="inline"> */}
        <IconButton onClick = {remove_it} aria-label="delete">
            <DeleteIcon style={{color:"red"}} />
        </IconButton>
    </div>
    </>
    )
}

function Select_tags(){
    
    const history = useHistory();
    const classes = useStyles();
    const [num, setNum] = useState( 1 );
    const [ tag_values, set_values ] = useState( [] );
    const whenChange = (event,ind,is_removed) => {
        let new_values = tag_values;
        if(is_removed)  new_values[ind] = "";
        else            new_values[ ind ] = event.target.value;
        set_values( new_values )
        console.log( new_values )
    }
    function add_tag(){
        setNum( num+1 );
        console.log( num )
    }
    let tags = []
    async function when_submitted(){
        let final_tags = new Set()
        for(let tag of tag_values ){
            if(tag !== "")
            {
                final_tags.add( tag )
            }
        }
        let final_arr = Array.from( final_tags )
        let questions = await fetch_problems(final_arr, 0,3500,15)
        history.push({
            pathname: '/dsa',
            state: { problems: questions } 
          })
    }
    for(let i = 0; i < num; ++i ){
        
        tags.push( 
            <>
                <Grid item>
                <Tag tag = "" handleChange = { (event,is_removed) => { whenChange(event,i,is_removed) } } id = {i}></Tag>
                </Grid>
            </>
        )
    }
    tag_values.push( "" )  
    return (
        <> 
        <Grid container md = {8} sm={10} xs={11} item alignItems="center" justify= "center" 
            style = {{marginTop: "5%", marginLeft: "5%"}}>
        <Grid xs = {11} container item direction="column"  elevation = {9}  
            spacing = {3} style = {{
                background :"white", minHeight: "60vh",
                }}>
            
            <Grid xs={11}  container item spacing={1} direction="row" alignItems="center" justify="flex-start"
                height = "30%">
                <Grid xs = {12} sm = {6} container item justify = "flex-start">
                    <Button  color="secondary" href = "/codeforces_handle"> Enter codeforces ID instead </Button>
                </Grid>
                <Grid xs style={{marginTop:"1vh"}} container item  justify ="flex-end">
                    <Button variant = 'contained' color ="primary"  onClick = { add_tag }> Add </Button>
                </Grid>
                <Grid  xs style={{marginTop:"1vh"}} container item  justify = "flex-start">
                    <Button variant = 'contained' color ="primary" style ={{color: "white",background:"#04cf0c"}} onClick = {when_submitted}> Submit</Button>
                </Grid>
            </Grid>
            <Grid container item xs = {12} justify ="center" alignItems = "center" height= "60%">
                <Grid item xs = {12}>
                    <h4 style = {{textAlign:"center"}}> Select Tags: </h4>
                </Grid>
                {tags}
            </Grid>
        </Grid>
        </Grid>
        </>
    )

    
}

export default Select_tags



