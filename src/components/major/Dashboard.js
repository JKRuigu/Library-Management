import React from 'react';
import Borrow from '../dashboard/borrow'
import Return from '../dashboard/return'
import { BrowserRouter as Router } from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import './student.css';
class Dashboard extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: false,
           value:0
       }
}

handleChange = (value) => {
   this.setState({
     value: value,
   });
 };

render(){
  const {value} = this.state
    return(
      <div className="content" style={{marginTop:"15px"}}>
          <div className="row">
            <div className="col-md-6">
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                >
                <Tab
                  icon={<FontIcon className="material-icons">call_made</FontIcon>}
                  label="BORROW"
                  value="0"
                />
                <Tab
                  icon={<FontIcon className="material-icons">call_received</FontIcon>}
                  label="RETURN"
                  value="1"
                />
              </Tabs>
              </div>
          </div>
          <div className="card" id="main-card">
            {
              value === 0 ? <Borrow /> : <Return />
            }
          </div>
      </div>
    )
  }
}


export default Dashboard;
