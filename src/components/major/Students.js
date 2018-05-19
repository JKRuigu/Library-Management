import React from "react";
import { connect } from 'react-redux';
import Form from '../students/form/StudentForm';
import Table from '../students/table';
import axios from 'axios';
import './student.css';
import { register,remove } from '../../actions/students.js';
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";



const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class Students extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: true,
           errors: [],
           editIdx: -1,
           columnToSort: "",
           sortDirection: "desc",
           query: "",
           columnToQuery: "admissionDate",
           editStudId:'',
           edited:false
       }
   }

  submit = data =>{
    console.log(data)
    this.props.register(data).then(() => {
      debugger
    }).catch( error => {
      this.setState({ errors: error })
    });

  }

  handleRemove = (e,i) => {
    const {id} = e.target;
    !id ? '' :
      this.props.remove(id).then(() => {})
        .catch( error => {
          this.setState({ errors: error })
        })
  }

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    const {isLoading, editStudId,students,edited} = this.state;
    if (editStudId && edited==true) {
      var studEditDetails =  students.filter(function(hero) {
        	return hero._id == editStudId;
        });
      if (studEditDetails) {
        const {isLoading, students} = this.state;
        this.setState({
           isLoading:true,
           students:''
          });
        let data = studEditDetails;
        axios.put(`/api/student/${editStudId}/edit`,data)
          .then(res => {
            let students = res.data.data;
            this.setState(state => ({
              students:students,
              isLoading:false,
              editStudId:''
            }));
          });
      }

    }
    this.setState({ editIdx: -1 });
  };

  handleChange = (e, name, i) => {
    const { value,id } = e.target;
    this.setState(state => ({
      students: state.students.map(
        (row, j) => (j === i ? { ...row, [name]: value } : row)
      ),
      editStudId:id,
      edited:true
    }));
  };

  handleSort = columnName => {
  this.setState(state => ({
    columnToSort: columnName,
    sortDirection:
      state.columnToSort === columnName
        ? invertDirection[state.sortDirection]
        : "asc"
  }));
}

  render(){
    const lowerCaseQuery = this.state.query.toLowerCase();
    const {isLoading, students} = this.state;
    return(
      <div className="content">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-info">Add <span><i className="material-icons">playlist_add</i></span></button>
            <button type="button" className="btn btn-info">Export <span><i className="material-icons">swap_horiz</i></span></button>
          </div>
            <div className="card" id="main-card">
                <div className="card-header">
                </div>
                <div className="card-footer">
                  <div className="row">
                    <div className="card">
                    <div className="card-header">
                    </div>
                      <Form submit={this.submit}/>
                    </div>
                  </div>
                </div>
                <div className="card" style={{ display: "flex" }}>
                <div className="row"  style={{ display: "flex", margin: "auto" }}>
                <TextField
                   hintText="Search.."
                   floatingLabelText="Search"
                   value={this.state.query}
                   onChange={e => this.setState({ query: e.target.value })}
                   floatingLabelFixed
                 />
                 <SelectField
                   style={{ marginLeft: "1em" }}
                   floatingLabelText="Select a column"
                   value={this.state.columnToQuery}
                   onChange={(event, index, value) =>
                     this.setState({ columnToQuery: value })
                   }
                 >
                 <MenuItem value="adminNo" primaryText="Admission Number" />
                 <MenuItem value="studentName" primaryText="Student Name" />
                 <MenuItem value="form" primaryText="Form" />
                 <MenuItem value="stream" primaryText="Stream" />
                 <MenuItem value="admissionDate" primaryText="Admission Date" />
               </SelectField>
                </div>
                <div className="card-body">
                <Table
                  handleSort={this.handleSort}
                  isLoading={this.state.isLoading}
                  handleRemove={this.handleRemove}
                  startEditing={this.startEditing}
                  editIdx={this.state.editIdx}
                  stopEditing={this.stopEditing}
                  handleChange={this.handleChange}
                  columnToSort={this.state.columnToSort}
                  sortDirection={this.state.sortDirection}
                  students={orderBy(
                    this.state.query
                      ? this.props.students.filter(x =>
                          x[this.state.columnToQuery]
                            .toLowerCase()
                            .includes(lowerCaseQuery)
                        )
                      : this.props.students,
                    this.state.columnToSort,
                    this.state.sortDirection
                  )}
                  titles={[
                    {
                      name: "Admission Number",
                      prop: "adminNo"
                    },
                    {
                      name: "Name",
                      prop: "studentName"
                    },
                    {
                      name: "Form",
                      prop: "form"
                    },
                    {
                      name: "Stream",
                      prop: "stream"
                    },
                    {
                      name: "Admission Date",
                      prop: "admissionDate"
                    }
                  ]}
                />
                </div>
                </div>
            </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
    students: state.students
});

export default connect(mapStateToProps,{register,remove})(Students);
