import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from 'react-redux';
import { addBook,addTitle,remove,edit} from '../../actions/books.js';
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import axios from 'axios';
import BookTitleform from '../books/form/BookTitleForm';
import BookForm from '../books/form/BookForm';
import Table from '../books/tables';

const invertDirection = {
  asc: "desc",
  desc: "asc"
};


class Books extends React.Component {
  constructor(props){
    super(props);
       this.state = {
           isLoading: true,
           errors: [],
           editIdx: -1,
           columnToSort: "",
           sortDirection: "desc",
           query: "",
           columnToQuery: "bookAccession",
           editStudId:'',
           edited:false,
           BookTitle:'123'
      }
}

submit = data =>{
  this.props.addTitle(data).then( () => {
    this.setState({ isLoading: false })
  }).catch( error => {
    this.setState({ errors: error })
  });
}

booksubmit = data =>{
  this.props.addBook(data).then(() => {
    this.setState({ isLoading: false })
  }).catch(error => {
    this.setState({
       errors: error,
       isLoading:false
     })
  });
}

handleRemove = (e,i) => {
  const {id} = e.target;
  if (id) {
    this.props.remove(id).then(() => {
      console.log('hello')
    })
    .catch( error => {
      this.setState({ errors: error })
    })
  }
};

startEditing = i => {
  this.setState({ editIdx: i });
};

stopEditing = () => {
    this.setState({ editIdx: -1 });
};

handleSave = (i, x,edited,currentBook) => {
  console.log(x);
  console.log(currentBook);
    // if (edited) {
    //   this.props.edit(x).then(() => {
    //     console.log('hello')
    //   })
    //   .catch( error => {
    //     this.setState({ errors: error })
    //   })
    //   this.stopEditing();
    // }
    // this.stopEditing();
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
    const {isLoading, books,oldState} = this.state;
    return(
      <MuiThemeProvider>
      <div className="content">
        <div className="card" id="main-card">
          <div className="card-body">
            <div className="col-lg-12">

            <div className="card col-lg-6"><BookTitleform submit={this.submit}/></div>
            <div className="card col-lg-6"><BookForm submit={this.booksubmit}/></div>
            </div>
            <div className=" col-lg-12">
            <div className="row" style={{ display: "flex", margin: "auto" }}>
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
      </div>
      </MuiThemeProvider>
    )
}
}


const mapStateToProps = state => ({
  books:state.books
});

export default connect(mapStateToProps,{addBook,addTitle,remove,edit})(Books);
