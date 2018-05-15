import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


class Dashboard extends React.Component {
  render(){
    return(
      <Router>
          <div className="content">
            <div className="content-main">
              <div className="">
                <div className="card" id="main-card">
                  <div className="card-header">
                  <div className="btn-group" role="group" aria-label="Basic example" >
                    </div>
                  </div>
                  <div className="card-body">
                  <button type="button" className="btn btn-primary">
                    Dashboard
                  </button>
                  </div>
                  <div className="card-footer"></div>
                </div>
              </div>
            </div>
          </div>
      </Router>
    )
  }
}

export default Dashboard;
