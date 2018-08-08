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
           show: false,
           currentPage: 1,
           itemsPerPage: 10
       }
       this.handleShow = this.handleShow.bind(this);
       this.handleHide = this.handleHide.bind(this);
       this.handleClick = this.handleClick.bind(this);
}
handleShow() {
 this.setState({ show: true });
}

handleHide() {
 this.setState({ show: false });
}

handleClick(event) {
  this.setState({
    currentPage: Number(event.target.id)
  });
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
    const {isLoading, students,edited,currentPage, itemsPerPage } = this.state;
    // Logic for displaying todos
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = this.props.students.slice(indexOfFirstItem, indexOfLastItem);
    var totalPages = Math.ceil(this.props.students.length / itemsPerPage)
    var startPage, endPage;
    if (totalPages <= 10) {
         // less than 10 total pages so show all
         startPage = 1;
         endPage = totalPages;
     } else {
         // more than 10 total pages so calculate start and end pages
         if (currentPage <= 6) {
             startPage = 1;
             endPage = 10;
         } else if (currentPage + 4 >= totalPages) {
             startPage = totalPages - 9;
             endPage = totalPages;
         } else {
             startPage = currentPage - 5;
             endPage = currentPage + 4;
         }
     }

        var totalItems = this.props.students.length
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        // console.log(pages);
    const renderPageNumbers = pages.map(number => {
      return (
        <li
          className="page-item"
          key={number}

        >
          <span className="page-link" key={number} id={number} onClick={this.handleClick} style={{"cursor":"pointer"}}>{number}</span>
        </li>
      );
    });
    return(
      <div className="content">
            <div className="card" id="main-card">
                <div className="card-header">
                <div style={{ display: "flex" }}>
                  <div className="row"  style={{ display: "flex", margin: "auto" }}>
                    <ButtonToolbar>
                      <Button bsStyle="primary" onClick={this.handleShow}>
                        Add Student
                      </Button>
                    </ButtonToolbar>
                    <span style={{"marginRight":"10"}}>
                      <Button className="btn btn-info">Import</Button>
                    </span>
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
                 <SelectField
                   style={{ marginLeft: "1em" }}
                   floatingLabelText="Select Number of Items to Display"
                   value={this.state.itemsPerPage}
                   onChange={(event, index, value) =>
                     this.setState({ itemsPerPage: value })
                   }
                 >
                 <MenuItem value="3" primaryText="3" />
                 <MenuItem value="10" primaryText="10" />
                 <MenuItem value="50" primaryText="50" />
                 <MenuItem value="100" primaryText="100" />
                 <MenuItem value="250" primaryText="250" />
                 <MenuItem value="500" primaryText="500" />
               </SelectField>
                </div>
                <div className="row" style={{ display: "flex"}}>
                 <div style={{display:"flex", margin: "auto" }}>
                 <nav aria-label="Page navigation example">
                   <ul className="pagination">
                     <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                     {renderPageNumbers}
                     <li className="page-item"><a className="page-link" href="#">Next</a></li>
                   </ul>
                 </nav>
                </div>
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
                  indexpageNumber={indexOfFirstItem}
                  students={orderBy(
                    this.state.query
                      ? this.props.students.filter(x =>
                          x[this.state.columnToQuery]
                            .toLowerCase()
                            .includes(lowerCaseQuery)
                        )
                      : currentItems,
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
