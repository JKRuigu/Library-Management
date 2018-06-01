import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from './App';
import Login from './Login'

class Main extends React.Component {
  constructor(props){
    super(props);
       this.state = {
           isLoading: true,
           errors: []
      }
}
  render() {
    const {auth} = this.state;
    if (!this.props.auth.length == 0 ) {
      return (
        <Login />
      );
    }else {
      console.log(this.props.auth);
      return (
      <App />
      );
    }
  }
}

const mapStateToProps = state => ({
  auth:state.auth
});

export default connect(mapStateToProps,{})(Main);
