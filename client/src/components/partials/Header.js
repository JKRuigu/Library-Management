import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import PersonIcon from "material-ui/svg-icons/social/people";
import BookMarksIcon from "material-ui/svg-icons/action/bookmark";
import SettingsIcon from "material-ui/svg-icons/action/settings";
import ReportIcon from "material-ui/svg-icons/action/trending-up";
import UpArrow from "material-ui/svg-icons/navigation/arrow-drop-up";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors:[],
      isLoading:false,
      active:'dashboard',
      open:false,
      openReport:false
    };
}

handleEvent(e){
   const {id} = e.target
   this.setState({
     active:id
   })
}
handleClick = () => {
  this.setState(state => ({
     openReport: false,
     open: !state.open
   }));
};
handleReportClick = () => {
  this.setState(state => ({
    open: false,
    openReport: !state.openReport
  }));
};

handleClose = () => {
  this.setState(state => ({
    open: false,
    openReport:false
  }));
};


  render(){
    const {active} = this.state
    return(
      <div className="">
          <div className="sidebar" data-color="green" data-background-color="orange">
          <div className="logo1">
              <h2 className="text-center">GHS</h2>
          </div>
          <hr/>
              <div className="sidebar-wrapper">
                <List>
                  <Link to='/' extact="true" >
                    <ListItem button onClick={this.handleClose}>
                     <Avatar>
                       <DashboardIcon />
                     </Avatar>
                     <ListItemText primary="Dashboard"/>
                   </ListItem>
                   </Link>
                  <Link to='/students' extact="true" >
                    <ListItem button onClick={this.handleClose}>
                     <Avatar>
                       <PersonIcon />
                     </Avatar>
                     <ListItemText primary="Students"/>
                   </ListItem>
                  </Link>
                  <ListItem button onClick={this.handleClick}>
                    <Avatar>
                      <BookMarksIcon />
                    </Avatar>
                    <ListItemText inset primary="Books" />
                    {this.state.open ? <UpArrow /> : <DownArrow />}
                  </ListItem>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                     <List component="div" disablePadding>
                        <Link to='/titles' extact="true" >
                         <ListItem button>
                           <ListItemText inset primary="Book Titles" />
                         </ListItem>
                        </Link>
                        <Link to='/books' extact="true" >
                          <ListItem button>
                            <ListItemText inset primary="Books" />
                          </ListItem>
                        </Link>
                     </List>
                   </Collapse>
                  <ListItem button onClick={this.handleReportClick}>
                    <Avatar>
                      <ReportIcon />
                    </Avatar>
                    <ListItemText inset primary="Report" />
                    {this.state.openReport ? <UpArrow /> : <DownArrow />}
                  </ListItem>
                  <Collapse in={this.state.openReport} timeout="auto" unmountOnExit>
                     <List component="div" disablePadding>
                      <Link to='/borrowed/books' extact="true" >
                         <ListItem button>
                           <ListItemText inset primary="Borrowed books" />
                         </ListItem>
                      </Link>
                      <Link to='/overdue' extact="true" >
                         <ListItem button>
                           <ListItemText inset primary="Overdue" />
                         </ListItem>
                      </Link>
                     </List>
                   </Collapse>
                </List>
                <Link to='/settings' extact="true" >
                  <ListItem button onClick={this.handleClose}>
                   <Avatar>
                     <SettingsIcon />
                   </Avatar>
                   <ListItemText primary="Settings"/>
                 </ListItem>
                 </Link>
              </div>
          </div>
    </div>
    )
  }
}

export default Header;
