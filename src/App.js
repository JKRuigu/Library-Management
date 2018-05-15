import React, { Component } from 'react';

import Header from './components/major/Header';
import Dashboard from './components/major/Dashboard';
import Students from './components/major/Students';
import Books from './components/major/Books';
import Report from './components/major/Report';
import Settings from './components/major/Settings';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './css/App.css';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="">
            <div className="wrapper">
            <Header />
                <Route exact path="/" component={Dashboard}/>
                <Route path='/students' component={Students}/>
                <Route path='/books' component={Books}/>
                <Route path='/report' component={Report}/>
                <Route path='/settings' component={Settings}/>
            </div>
            </div>
        </Router>
    );
  }
}

export default App;
