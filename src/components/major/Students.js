import React from "react";
import { connect } from 'react-redux';
import Form from '../students/form/StudentForm';
import Table from '../students/table';
import axios from 'axios';
import './student.css';
import { register,remove,edit } from '../../actions/students.js';
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import { Modal, Button ,ButtonToolbar} from 'react-bootstrap';

const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class Students extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: false,
           editStudent:[],
           errors: [],
           editIdx: -1,
           columnToSort: "",
           sortDirection: "desc",
           query: "",
           columnToQuery: "admissionDate",
           editStudId:'',
           show: false
       }
       this.handleShow = this.handleShow.bind(this);
       this.handleHide = this.handleHide.bind(this);
   }
handleShow() {
 this.setState({ show: true });
}

handleHide() {
 this.setState({ show: false });
}

submit = data =>{
    this.props.register(data).then(() => {
      alert('The student details were added successfully.');
      this.setState({ show: false });
    }).catch( error => {
      alert('An error occurred during the process,Please try again(aviod Admission number duplication).')
    });
}

handleRemove = (e,i) => {
  if (window.confirm("Are you sure you want to delete this record ?")) {
    const {id} = e.target;
    if (id) {
      this.props.remove(id).then(() => {
        alert('Item deleted')
      })
      .catch( error => {
        this.setState({ errors: error })
      })
    }
  }
}

startEditing = i => {
    this.setState({ editIdx: i });
};

stopEditing = () => {
    this.setState({ editIdx: -1 });
};

handleSave = (i, x,edited) => {
    if (edited) {
      if (window.confirm("Are you sure you want to save this changes ?")) {
        this.setState({isLoading:true});
        this.props.edit(x).then(() => {
          this.setState({isLoading:false});
          alert('Changes added successfully !');
        })
        .catch( error => {
          this.setState({isLoading:false});
          alert('An error occurred ! Please try again.(Avoid Duplication)');
        })
      }else {
        this.stopEditing();
      }
    }
    this.stopEditing();
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

handlePrint = (e,x)=>{
  // const {id} = e.target
  console.log(x);
  console.log(e);
  // let id = e.target
  // var printcontent = document.getElementById(id).innerHTML;
  // document.body.innerHTML = printcontent;
  // window.print();
  // document.body.innerHTML = restorepage;
}

render(){
    const lowerCaseQuery = this.state.query.toLowerCase();
    const {isLoading, students,edited} = this.state;
    return(
      <div className="content">
            <div className="card" id="main-card">
                <div className="card-header">
                <ButtonToolbar>
                  <Button bsStyle="primary" onClick={this.handleShow}>
                    Add Student
                  </Button>
                </ButtonToolbar>
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
                  handleSave={this.handleSave}
                  columnToSort={this.state.columnToSort}
                  sortDirection={this.state.sortDirection}
                  handlePrint={this.handlePrint}
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
                      name: "#",
                      type:"number"
                    },
                    {
                      name: "Admission Number",
                      prop: "adminNo",
                      type:"number"
                    },
                    {
                      name: "Name",
                      prop: "studentName",
                      type:"text"
                    },
                    {
                      name: "Form",
                      prop: "form",
                      type:"number"
                    },
                    {
                      name: "Stream",
                      prop: "stream",
                      type:"text"
                    },
                    {
                      name: "Admission Date",
                      prop: "admissionDate",
                      type:"date"
                    }
                  ]}
                />
                </div>
                </div>
            </div>
            <ButtonToolbar>
            <Modal
              {...this.props}
              show={this.state.show}
              onHide={this.handleHide}
              dialogClassName="custom-modal"
            >
              <Modal.Body>
                <div className="">
                <Form submit={this.submit}/>
                </div>
              </Modal.Body>
            </Modal>
          </ButtonToolbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    students: state.students
});

export default connect(mapStateToProps,{register,remove,edit})(Students);
