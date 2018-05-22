import React from 'react';
import { connect } from 'react-redux';
import TextField from "material-ui/TextField";
import Form from './form';
import Table from './table';


class Borrow extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          isLoading: false
      }
}

render(){
    return(
      <div className="row">
        <div className="row text-center"  style={{ display: "flex"}}>
          <div className="col-md-12"  style={{ display: "flex", marginLeft: "500px" }}>
            <TextField
                autocomplete="off"
                list="datalist2"
                hintText="Search.."
                floatingLabelText="Enter Student Admission Number"
                value={this.state.query}
                onChange={this.handleStudentQueryChange}
                floatingLabelFixed
             />
          </div>
        </div>
        <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Form />
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <div className="card">
          <div className="card-head"></div>
          <div className="card-body">
              <Table />
          </div>
        </div>
        </div>
        </div>
      </div>
  )
 }
}

function mapStateToProps(state){
    return{
        books: state.books,
        students:state.students
    };
}

export default connect(mapStateToProps)(Borrow);
