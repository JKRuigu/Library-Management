import React from "react";
import '../../css/nav.css';
import { connect } from 'react-redux';
import { logOut } from '../../actions/auth.js';

class NavBar extends React.Component {
  constructor(props){
    super(props);
       this.state = {
           isLoading: false,
           isLogin:true
      }
    this.handleChange = this.handleChange.bind(this);
}
handleChange() {
  console.log('dsajkf');
  this.props.logOut().then(() => {
    console.log('logOut');
  }).catch( error => {
    console.log(error);
  });
}

render(){
    return(
      <nav className="navbar navbar-default">
          <ul className="navbar-ul">
            <li className="navbar-li" onClick={this.handleChange}>
              <i className="material-icons">supervisor_account</i>
              <p>Log Out</p>
            </li>
          </ul>
      </nav>
    )
}
}

const mapStateToProps = state => ({
    auth:state.auth
});

export default connect(mapStateToProps,{logOut})(NavBar);
