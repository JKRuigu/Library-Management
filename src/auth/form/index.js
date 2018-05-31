import React, { Component } from 'react';

class LoginForm extends React.Component {
  state = {
    data:{}
  };

  submit = ()=> {
    this.props.submit(this.state.data);
  };

  handleChange  = (e)=> {
    this.setState({ data : { ...this.state.data, [e.target.name]: e.target.value } });
  };
  render() {
    return (
      <form  onSubmit={this.submit}>
          <h1>Staff log in</h1>
          <p>
              <label for="username" className="uname" >Username </label>
              <input onChange={this.handleChange}  autocomplete="off"	 name="username" required="required" type="text" placeholder="Enter your username"/>
          </p>
          <p>
              <label for="password" className="youpasswd">Password </label>
              <input onChange={this.handleChange}  autocomplete="off" name="password" required="required" type="password" placeholder="Enter your password" />
          </p>
          <p className="text-center">
            <button type="submit" value="" name="button" className="btn btn-info " style={{width:"60%"}}>LOG IN</button>

          </p>
      </form>

    );
  }
}

export default LoginForm;
