import React from "react";
import '../../css/login.css';

class Login extends React.Component {
  render(){
    return(
      <section>
                <div id="container_demo" >
                    <div id="wrapper">
                        <div id="login" className="animate form">
                            <form>
                                <h1>Staff log in</h1>
                                <p>
                                    <label for="username" >Username </label>
                                    <input name="username" type="text" placeholder="Enter your username"/>
                                </p>
                                <p>
                                    <label for="password" >Password </label>
                                    <input id="password"  name="password"  type="password" placeholder="Enter your password" />
                                </p>
                                <p className="text-center">
                                  <button type="submit" className="btn btn-info ">LOG IN</button>

                                </p>
                              </form>
                                <p className="change_link">
              									Forgot password ?
              									<a href="#toregister" className="to_register">Recover password</a>
              								</p>
                        </div>
                    </div>
                </div>
            </section>
    )
  }
}

export default Login;
