import React from "react";
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render(){
    return(
    <div className="">
        <div className="sidebar" data-color="green" data-background-color="orange">
            <div className="logo">
                <p className="simple-text logo-normal">
                    GHS
                </p>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className="nav-item active ">
                        <Link to='/' extact>
                            <i className="material-icons">dashboard</i>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link to='/students'>
                            <i className="material-icons">supervisor_account</i>
                            <p>Students</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link to='/books' className="active">
                            <i className="material-icons">description</i>
                            <p>Books</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link to='/report'>
                            <i className="material-icons">trending_up</i>
                            <p>Report</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link to='/settings'>
                            <i className="material-icons">settings</i>
                            <p>Settings</p>
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
