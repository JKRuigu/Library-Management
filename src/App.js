import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './components/partials/Header';
import Dashboard from './components/major/Dashboard';
import Students from './components/major/Students';
import Books from './components/books/Books';
import Title from './components/books/Title';
import BorrowedBooks from './components/report/BorrowedBooks';
import Overdue from './components/report/Overdue';
import Settings from './components/major/Settings';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
        <BrowserRouter>
       <div>
         <Header />
         <Switch>
           <Route exact="true" path="/" component={Dashboard}/>
           <Route exact="true" path='/students' component={Students}/>
           <Route exact="true" path='/books' component={Books}/>
           <Route exact="true" path='/titles' component={Title}/>
           <Route exact="true" path='/borrowed/books' component={BorrowedBooks}/>
           <Route exact="true" path='/overdue' component={Overdue}/>
           <Route exact="true" path='/settings' component={Settings}/>
           <Route  component={Dashboard}/>
         </Switch>
       </div>
     </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
