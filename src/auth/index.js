import React, { Component } from 'react';
import './css/style.css'

class LoginPage extends Component {
  render() {
    return (
      <div className="container">
            <section>
                <div id="container_demo" >
                    <div id="wrapper">
                        <div id="login" className="animate form">
                            
                                <p className="change_link">
              									Forgot password ?
              									<span>Recover password</span>
              								</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
  }
}

export default LoginPage;
