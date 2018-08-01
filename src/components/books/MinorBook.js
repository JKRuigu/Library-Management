import React from "react";
import { connect } from 'react-redux';
import { addBook,remove,edit} from '../../actions/books.js';
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Table from '../books/tables';
import BookTitleTable from '../books/tables/titles'

const invertDirection = {
  asc: "desc",
  desc: "asc"
};


class MinorBooks extends React.Component {
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
           show: false,
           showModal: false,
           showTable:'books'
      }
}

handleRemove = (e,i) => {
  const {showTable} = this.state;
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

startEditing = i => {
  this.setState({ editIdx: i });
};

stopEditing = () => {
    this.setState({ editIdx: -1 });
};

handleSave = (i, x,edited,currentBook) => {
  if (edited) {
    if (window.confirm("Are you sure you want to save this changes ?")) {
      this.setState({isLoading:true});
      this.props.edit(x).then(() => {
        this.setState({isLoading:false});
        alert('Changes added successfully !');
      })
      .catch( error => {
        console.log(error);
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
    const {isLoading, books,oldState,showTable} = this.state;
    return(
      <div className="card">
       <div className="card-body">
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
            <MenuItem value="bookAccession" primaryText="Book Acc Number" />
            <MenuItem value="Isbn" primaryText="Isbn" />
            <MenuItem value="bookCondition" primaryText="Book Condition" />
          </SelectField>
           </div>
         </div>
         <div className="card-body" >
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
       </div>
       <div className="card-footer">
       </div>
     </div>
    )
}
}


const mapStateToProps = state => ({
  books:state.books
});

export default connect(mapStateToProps,{addBook,remove,edit})(MinorBooks);
