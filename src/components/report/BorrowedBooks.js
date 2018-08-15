import React from 'react';
import { connect } from 'react-redux';
import {remove } from '../../actions/students.js';
import Table from './table/borrowed';
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import orderBy from "lodash/orderBy";

const invertDirection = {
  asc: "desc",
  desc: "asc"
};


class BorrowedBooksReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnToSort: "",
      sortDirection: "desc",
      query: "",
      columnToQuery: "bookAccession",
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
      <div className="content">
        <div className="card" id="main-card">
        <u><h3 className="text-center">Borrowed Books Report</h3></u>
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
            <MenuItem value="bookAccession" primaryText="Book Acc Number" />
            <MenuItem value="Isbn" primaryText="Isbn" />
            <MenuItem value="bookCondition" primaryText="Book Condition" />
          </SelectField>
         </div>
         </div>
         <Table
           handleSort={this.handleSort}
           isLoading={this.state.isLoading}
           edited={this.state.edited}
           handleRemove={this.handleRemove}
           startEditing={this.startEditing}
           editIdx={this.state.editIdx}
           stopEditing={this.stopEditing}
           handleSave={this.handleSave}
           columnToSort={this.state.columnToSort}
           sortDirection={this.state.sortDirection}
           books={orderBy(
             this.state.query
               ? this.props.books.filter(x =>
                   x[this.state.columnToQuery]
                     .toLowerCase()
                     .includes(lowerCaseQuery)
                 )
               : this.props.books,
             this.state.columnToSort,
             this.state.sortDirection
           )}
           titles={[
             {
               name: "#"
             },
             {
               name: "Book Accession No:",
               prop: "bookAccession"
             },
             {
               name: "Isbn",
               prop: "Isbn"
             },
             {
               name: "Book Title",
               prop: "bookTitle"
             },
             {
               name: "bookCondition",
               prop: "bookCondition"
             }
           ]}
         />
       </div>
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

export default connect(mapStateToProps,{remove})(BorrowedBooksReport);
