import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/style.css'
import LoginForm from  './form'
import { login } from '../actions/auth.js';

class LoginPage extends React.Component {
  constructor(props){
    super(props);
       this.state = {
           isLoading: true,
           errors: []
      }
}
submit = data =>{
  console.log(data);
  this.props.login(data).then( res => {
    console.log(res);
    debugger
    this.setState({ isLoading: false })
  }).catch( error => {
    alert('There was an error durring authentication!');
    this.setState({ errors: error })
  });
}
  render() {
    return (
      <div className="container">
        <section>
            <div id="container_demo" >
                <div id="login-wrapper">
                    <div id="login" className="animate form">
                      <LoginForm  submit={this.submit}/>
                      <p className="change_link text-center">
      									reset password
      								</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps,{login})(LoginPage);
