
import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Ci from './Codeforces_input';
import Dsa from './Display_dsa';
import Login from './Login'
import Register from './Register'
import Tags from './Tags'
import NavBar from './NavBar'
function App(props) {
  return (
    <>
      <NavBar userLoggedIn = {props.userLoggedIn} username = {props.username} codeforces_id = {"darshang124"}/>
    <Switch>
      <Route exact path={["/", "/register"]} render = { 
        (pro)=>(   
          <Register csrf={props.csrf} error= {props.error} h = "90vh"
          /> )

        }
      />
      <Route exact path="/login"  render = {(pro)=>(<Login h = "90vh" csrf = {props.csrf} error= {props.error}/>)   } />
      <Route exact path="/codeforces_handle" component={Ci} />
      <Route exact path="/dsa" component={Dsa} />
      <Route exact path="/tags" component={Tags} />
    </Switch>
    </>
  );
}

export default App;
