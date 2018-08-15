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
      isLoading:false,
      currentPage: 1,
      itemsPerPage: 10
    };
    this.handleClick = this.handleClick.bind(this);
}

handleClick(event) {
  this.setState({
    currentPage: Number(event.target.id)
  });
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


render() {
    const lowerCaseQuery = this.state.query.toLowerCase();

    const {show,currentPage, itemsPerPage} = this.state

    // Logic for displaying todos
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = this.props.overdue.slice(indexOfFirstItem, indexOfLastItem);
    var totalPages = Math.ceil(this.props.overdue.length/ itemsPerPage)
    console.log(totalPages);
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
        var totalItems = this.props.overdue.length
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
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
    return (
      <div className="content">
        <div className="card" id="main-card">
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
           <SelectField
             style={{ marginLeft: "1em" }}
             floatingLabelText="Select Number of Items to Display"
             value={this.state.itemsPerPage}
             onChange={(event, index, value) =>
               this.setState({ itemsPerPage: value })
             }
           >
           <MenuItem value="10" primaryText="10" />
           <MenuItem value="50" primaryText="50" />
           <MenuItem value="100" primaryText="100" />
           <MenuItem value="250" primaryText="250" />
           <MenuItem value="500" primaryText="500" />
         </SelectField>
         </div>
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
       <Table
        handleSort={this.handleSort}
        isLoading={this.state.isLoading}
        handleRemove={this.handleRemove}
        columnToSort={this.state.columnToSort}
        sortDirection={this.state.sortDirection}
        indexpageNumber={indexOfFirstItem}
        overdue={orderBy(
          this.state.query
            ? this.props.overdue.filter(x =>
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
       </div>
    );
  }
}
function mapStateToProps(state){
  const result = state.books.filter(book => book.isAvailable == false );
  return{
      overdue:state.overdue
  };
}

export default connect(mapStateToProps,{remove})(OverdueReport);
