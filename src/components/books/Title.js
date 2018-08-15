import React from "react";
import { connect } from 'react-redux';
import { editTitle} from '../../actions/titles.js';
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import BookTitleTable from '../books/tables/titles'

const invertDirection = {
  asc: "desc",
  desc: "asc"
};


class Titles extends React.Component {
  constructor(props){
    super(props);
       this.state = {
           isLoading: false,
           errors: [],
           editIdx: -1,
           columnToSort: "",
           sortDirection: "desc",
           query: "",
           columnToQuery: "bookAccession",
           editStudId:'',
           edited:false,
           showTable:'books',
           currentPage: 1,
           itemsPerPage: 10
      }
}

startEditing = i => {
  this.setState({ editIdx: i });
};

stopEditing = () => {
    this.setState({ editIdx: -1 });
};

handleSaveTitle = (i, x,edited) => {
    if (edited) {
      if (window.confirm("Are you sure you want to save this changes ?")) {
        this.setState({isLoading:true});
        this.props.editTitle(x).then(() => {
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
};

render(){
    const lowerCaseQuery = this.state.query.toLowerCase();
    const {isLoading,currentPage, itemsPerPage} = this.state;

    // Logic for displaying todos
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = this.props.bookTitles.slice(indexOfFirstItem, indexOfLastItem);
    var totalPages = Math.ceil(this.props.bookTitles.length/ itemsPerPage)
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
        var totalItems = this.props.bookTitles.length
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

return(
    <div className="content">
      <div className="card" id="main-card">
         <div className=" col-lg-12">
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
            <MenuItem value="bookTitle" primaryText="Book Title" />
            <MenuItem value="bookAuthor" primaryText="Author" />
            <MenuItem value="bookSection" primaryText="Section" />
            <MenuItem value="bookCategory" primaryText="Category" />
            <MenuItem value="bookPublisher" primaryText="Publisher" />
            <MenuItem value="numberOfCopies" primaryText="No. of Copies" />
          </SelectField>
           </div>
         </div>
         <div className="card-body" >
           <BookTitleTable
             handleSort={this.handleSort}
             isLoading={this.state.isLoading}
             edited={this.state.edited}
             startEditing={this.startEditing}
             editIdx={this.state.editIdx}
             stopEditing={this.stopEditing}
             handleSave={this.handleSaveTitle}
             columnToSort={this.state.columnToSort}
             sortDirection={this.state.sortDirection}
             books={orderBy(
               this.state.query
                 ? this.props.bookTitles.filter(x =>
                     x[this.state.columnToQuery]
                       .toLowerCase()
                       .includes(lowerCaseQuery)
                   )
                 : this.props.bookTitles,
               this.state.columnToSort,
               this.state.sortDirection
             )}
             titles={[
               {
                 name: "#"
               },
               {
                 name: "Title",
                 prop: "bookTitle"
               },
               {
                 name: "Author",
                 prop: "bookAuthor"
               },
               {
                 name: "Section",
                 prop: "bookSection"
               },
               {
                 name: "Category",
                 prop: "bookCategory"
               },
               {
                 name: "Publisher",
                 prop: "bookPublisher"
               },
               {
                 name: "Book Category",
                 prop: "bookCategory"
               },
               {
                 name: "No. of Copies",
                 prop: "numberOfCopies"
               }
             ]}
           />
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
         </div>
         </div>
       </div>
     </div>
    )
}
}


const mapStateToProps = state => ({
  bookTitles:state.titles
});

export default connect(mapStateToProps,{editTitle})(Titles);
