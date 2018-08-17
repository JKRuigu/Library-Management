import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
// import 'jquery/dist/jquery.js';
// require('bootstrap/dist/css/bootstrap.min.css')
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import 'material-icons/iconfont/material-icons.scss';
import 'material-icons/iconfont/material-icons.css';
// import 'semantic-ui-css/semantic.min.css';
import store from './store';
import AuthPage from './components/major/Login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
      <AuthPage />
  </Provider>,document.getElementById('root'));
registerServiceWorker();
