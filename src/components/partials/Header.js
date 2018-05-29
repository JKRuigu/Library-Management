import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors:[],
      isLoading:false,
      active:'dashboard'
    };
}

handleEvent(e){
  console.log(this.props);
   const {id} = e.target
   this.setState({
     active:id
   })
}

  render(){
    const {active} = this.state
    return(
    <div className="">
        <div className="sidebar" data-color="green" data-background-color="orange">
        <div className="logo1">
            <h1 className="text-center" style={{marginTop:"10px"}}>GHS</h1>
        </div>
            <div className="sidebar-wrapper">
            <hr/>
                <ul className="nav">
                    <li className={active == 'dashboard' ? 'nav-item active' :'nav-item'} id="dashboard" onClick={e => this.handleEvent(e)}  name="dashboard">
                        <Link to='/' extact name="students" id="dashboard">
                            <i className="material-icons">dashboard</i>
                            <p id="dashboard">Dashboard</p>
                        </Link>
                    </li>
                    <li className={active == 'students' ? 'nav-item active' :'nav-item'} onClick={e => this.handleEvent(e)} id="students">
                        <Link to='/students' id="students">
                            <i className="material-icons">supervisor_account</i>
                            <p id="students">Students</p>
                        </Link>
                    </li>
                    <li className={active == 'books' ? 'nav-item active' :'nav-item'} onClick={e => this.handleEvent(e)}  id="books">
                        <Link to='/books' className="active" id="books">
                            <i className="material-icons">library_books</i>
                            <p id="books">Books</p>
                        </Link>
                    </li>
                    <li className={active == 'report' ? 'nav-item active' :'nav-item'} onClick={e => this.handleEvent(e)} id="report">
                        <Link to='/report' id="report">
                            <i className="material-icons">trending_up</i>
                            <p id="report">Report</p>
                        </Link>
                    </li>
                    <li className={active == 'settings' ? 'nav-item active' :'nav-item'} onClick={e => this.handleEvent(e)} id="settings">
                        <Link to='/settings' id="settings">
                            <i className="material-icons">settings</i>
                            <p id="settings">Settings</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
  }
}

export default Header;
