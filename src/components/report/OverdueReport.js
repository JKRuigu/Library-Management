import React from 'react';
import { connect } from 'react-redux';
import {remove } from '../../actions/students.js';
import Table from './table/overdue';
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import orderBy from "lodash/orderBy";

const invertDirection = {
  asc: "desc",
  desc: "asc"
};


class OverdueReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnToSort: "",
      sortDirection: "desc",
      query: "",
      columnToQuery: "studId",
      errors:[],
      isLoading:false
    };
}
handleRemove = (e,i) => {
  const {id} = e.target;
  if (id) {
    if (window.confirm("Are you sure you want to delete this record ?")) {
    this.props.remove(id).then(() => {
      alert('Item deleted')
    })
    .catch( error => {
      this.setState({ errors: error })
    })
  }
 }
};

handleSort = columnName => {
  this.setState(state => ({
    columnToSort: columnName,
    sortDirection:
      state.columnToSort === columnName
        ? invertDirection[state.sortDirection]
        : "asc"
  }));
};

handlePagination = () =>{

}

render() {
    const lowerCaseQuery = this.state.query.toLowerCase();

    const {show} = this.state
    return (
      <div className="card">
        <h2 className="text-center">Overdue students report</h2>
        <div className="row" style={{ display: "flex"}}>
         <div style={{display:"flex", margin: "auto" }}>
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
               <MenuItem value="studId" primaryText="Admission Number" />
               <MenuItem value="studName" primaryText="Student Name" />
               <MenuItem value="BookAcc" primaryText="Book Accession No" />
               <MenuItem value="period" primaryText="Overdue Period" />
               <MenuItem value="bookTitle" primaryText="Book Title" />
              </SelectField>
         </div>
         </div>
       <Table
        handleSort={this.handleSort}
        isLoading={this.state.isLoading}
        handleRemove={this.handleRemove}
        columnToSort={this.state.columnToSort}
        sortDirection={this.state.sortDirection}
        overdue={orderBy(
          this.state.query
            ? this.props.overdue.filter(x =>
                x[this.state.columnToQuery]
                  .toLowerCase()
                  .includes(lowerCaseQuery)
              )
            : this.props.overdue,
          this.state.columnToSort,
          this.state.sortDirection
        )}
        titles={[
          {
            name: "#"
          },
          {
            name: "Admission Number",
            prop: "studId"
          },
          {
            name: "Student Name",
            prop: "studName"
          },
          {
            name: "Book Acc No",
            prop: "BookAcc"
          },
          {
            name: "Book Title",
            prop: "bookTitle"
          },
          {
            name:"period(days)",
            prop:"period"
          }
        ]}
       />
       </div>
    );
  }
}
function mapStateToProps(state){
  const result = state.books.filter(book => book.isAvailable == false );
  return{
      books: result,
      overdue:state.overdue
  };
}

export default connect(mapStateToProps,{remove})(OverdueReport);
