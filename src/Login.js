import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import LoginPage from './auth'

class Login extends Component {
  render() {
    return (
        <Router>
          <Route exact path="/" component={LoginPage}/>
        </Router>
    );
  }
}

export default Login;
