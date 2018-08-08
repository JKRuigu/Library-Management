import React from "react";
import { connect } from 'react-redux';
import App from '../../App';
import '../../css/login.css';
import { login } from '../../actions/auth.js';

class Login extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: false,
           isLogin:false,
           data:{},
           isSuccess:false
       }
  }

  submit = (e)=> {
    e.preventDefault()
    const {data} = this.state;
    this.setState({isLoading: true});
    this.props.login(data).then(() => {
      this.setState({isSuccess: true});
      setTimeout(
          function() {
            this.setState({isSuccess: false,isLogin:true,isLoading:false});
          }
          .bind(this),
          3500
      );
    }).catch( error => {
    this.setState({isLogin:false,isLoading:false})
    });
  };

  handleChange  = (e)=> {
    this.setState({ data : { ...this.state.data, [e.target.name]: e.target.value } });
  };

render(){
  const {isLogin,isLoading,isSuccess} = this.state;
  console.log(isLogin);
    return(
      <div>
      {
        isLogin ? <App /> :
        <div id="Login-Page">
          <div className="login-form">
            <div className="main-div">
              <form onSubmit={this.submit}>
                <div className="form-group">
                  <input type="text" onChange={this.handleChange} className="form-control form-control-login" name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-login" name="password" placeholder="Password" onChange={this.handleChange}/>
                </div>
                {
                  isLoading ? <button type="submit"  className="login-btn btn-success" disabled>Loading</button>:
                  <button type="submit"  className="login-btn" >{!isLoading ? 'Login':'Loading...'}</button>
                }
              </form>
              {
                !isSuccess ? '':
                <div>
                <div className="progress">
                  <div className="progress-bar progress-bar-striped active" role="progressbar"
                  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{"width":"100%"}}>
                  </div>
                </div>
                <div>
                <p className="load-info">Loading system data...</p>
                </div>
                </div>
              }
            </div>
            </div>
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps = state => ({
    auth:state.auth
});

export default connect(mapStateToProps,{login})(Login);
