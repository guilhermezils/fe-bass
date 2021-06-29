import React, { Component } from 'react';
import axios from 'axios'
import { useState, useEffect} from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'




export default function App()  {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState([])
  const url = "http://localhost:3001"

  
  function loginStatus(){
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(res => {
      if (res.errors){
        setErrors(res.errors)
        console.log(res.data.user)
      } else {
        setIsLoggedIn(true)
        setUser(res.data.user)
      }
    })
  }
  useEffect(() => {
    loginStatus()
  }, [])

  function handleLogout(){
    setIsLoggedIn(false)
    setUser({})
  }

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
              <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route 
              exact path='/login' 
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  
}
