import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './components/partials/Header';
import Dashboard from './components/major/Dashboard';
import Students from './components/major/Students';
import Books from './components/major/Books';
import Report from './components/major/Report';
import Settings from './components/major/Settings';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import './css/App.css';
import './css/index.css';
import { fetch } from './actions/students';
import { fetchBooks } from './actions/books';
import { fetchTitles } from './actions/titles';
import { fetchStream } from './actions/config';
import { fetchOverdue } from './actions/overdue';
import Store from './store';
Store.dispatch(fetch());
Store.dispatch(fetchBooks());
Store.dispatch(fetchTitles());
Store.dispatch(fetchStream());
Store.dispatch(fetchOverdue());

injectTapEventPlugin();
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
            <div className="">
            <div className="wrapper">
            <Header />
                <Route exact="true" path="/" component={Dashboard}/>
                <Route exact="true" path='/students' component={Students}/>
                <Route exact="true" path='/books' component={Books}/>
                <Route exact="true" path='/report' component={Report}/>
                <Route exact="true" path='/settings' component={Settings}/>
            </div>
            </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
