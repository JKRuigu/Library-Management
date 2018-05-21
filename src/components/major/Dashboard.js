import React from 'react';
import Borrow from '../dashboard/borrow'
import { BrowserRouter as Router } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: false
       }
}

render(){
    return(
      <div className="content">
            <div className="card" id="main-card">
              <Borrow />
            </div>
      </div>
    )
  }
}


export default Dashboard;
