import React from "react";
class Report extends React.Component {
  render(){
    return(
      <div className="content">
        <div className="card" id="main-card">
          <div className="card-head"></div>
          <div className="card-body">
            <h1>Report</h1>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Launch demo modal
            </button>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    )
  }
}

export default Report;
