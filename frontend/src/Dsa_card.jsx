import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button'
import {useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
const zip = (a, b) => a.map((k, i) => [k, b[i]]);
const useStyles = makeStyles((theme) => ({
    set_size:{
      [theme.breakpoints.down('430')]: {
          fontSize: "15px"
      },
    }
 }));
let arr = [
    {
        tag: "Dynamic Programming",
        name: ["Maximum width","Random Events","Mortal Kombat Tower"], 
        url: ["https://codeforces.com/problemset/problem/1492/C","https://codeforces.com/problemset/problem/1461/C",
             "https://codeforces.com/problemset/problem/1418/C"],
        hs: "none",
    },
    {
        tag: "Greedy",
        name: ["Accidental Victory","Find The Array","Add to Neighbour and Remove"],
        url: ["https://codeforces.com/problemset/problem/1490/E","https://codeforces.com/problemset/problem/1463/B",
             "https://codeforces.com/problemset/problem/1462/D"],
        hs: "none",
    }
 ]



function Dsacards(props){
    let locs = useLocation();
    const classes2 = useStyles();
    const history = useHistory();
    if(  locs.state === undefined){
        history.push({
            pathname: '/codeforces_handle',
         //   state: { problems: ans } 
          })
    
    }
    else    arr = locs.state.problems
    /*let user = await fetch_user( props.location.prop.handleID )
    let tags = await fetch_tags( props.location.prop.handleID )
    let arr = await fetch_problems( filter(tags),user.rating,100 )
    */
    function hide_show_fun(i) {
        var x = document.getElementById(i);
        console.log(  "clicked");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }

    function func2(a){
        return(
            <>
            
            <Box justifyContent="center">
                <Button size= "small"style={{textTransform:"none"}} fullWidth   href = {a[1]} target="_blank">
                    <h3>{ a[0] }</h3>
                    {/* <Link component ="button" href = {a[1]} target="_blank" align="center"> {a[0]}</Link> */}
                </Button>
            </Box>
            </>
        );
    }

    function func(val,i){
        //console.log(i);
        return(
            <>
            <Grid xs = {12}item container spacing={0} direction="column" alignItems="center" justify = "center">
                <Box item boxShadow={3} bgcolor="background.paper" mt={2} borderRadius={10}
                style={{minWidth: "30%", maxWidth: "50%"}}>  
                    <Button fullWidth onClick={() => {hide_show_fun(i)}} >
                        <Grid container spacing = {0} alignItems = "center">
                            <Grid item xs = {10}>     
                        
                                    <Box ml={2}>    
                                    <h2 className = {classes2.set_size}>{val.tag}</h2>
                                    </Box>
                        
                            </Grid>                        
                            <Grid item xs>
                                <ArrowDropDownIcon/>
                            </Grid>               
                        </Grid>
                    </Button>
                </Box>
            </Grid>
            <div id={i} style={{display: "none"}} align="center">
            <Box boxShadow={3} bgcolor="background.paper" mt={1} mb={2} borderRadius={10}
                style={{minWidth: "30%", maxWidth: "50%"}} p={1}> 
                
                {zip(val.name,val.url).map(func2)}
                    
            </Box>
            </div>
            </>
        );
    }

    return(
        <>
           {arr.map(func)}
        </>
    );
}

export default Dsacards;