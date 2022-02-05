import React, {Fragment} from 'react'
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layouts/Alert';
import ContactState from './context/contact/ContactState';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
    <Fragment>
      <Navbar title = "Contact keeper" icon = 'fas fa-id-card-alt'/>
      <div className = "container">
        <Alert/>
        <Switch>
          <PrivateRoute exact path = "/" component = {Home}/>
          <Route exact path = "/about" component = {About}/>
          <Route exact path = "/register" component = {Register}/>
          <Route exact path = "/login" component = {Login}/>
        </Switch>
      </div>
    </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  )
}

export default App
