import React from "react";
import '../../css/login.css';

class Login extends React.Component {
  render(){
    return(
      <div id="Login-Page">
        <div className="login-form">
          <div className="main-div">
            <form id="Login">
              <div className="form-group">
                <input type="email" className="form-control" id="inputEmail" placeholder="Username" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
          </div>
      </div>

    )
  }
}

export default Login;
