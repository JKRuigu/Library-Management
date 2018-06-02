import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from 'react-redux';
import { addBook,addTitle,remove,edit,removeTitle} from '../../actions/books.js';
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import axios from 'axios';
import BookTitleform from '../books/form/BookTitleForm';
import BookForm from '../books/form/BookForm';
import Table from '../books/tables';
import BookTitleTable from '../books/tables/titles'
import { Modal, Button ,ButtonToolbar} from 'react-bootstrap';
import './student.css';

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
           show: false,
           showModal: false,
           showTable:'books'
      }
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
}

handleShow() {
  this.setState({ show: true });
}

handleHide() {
  this.setState({ show: false });
}

handleShowModal() {
  this.setState({ showModal: true });
}

handleHideModal() {
  this.setState({ showModal: false });
}

submit = data =>{
  this.props.addTitle(data).then(() => {
    alert('Book Title added successfully !');
    this.setState({ isLoading: false })
  }).catch( error => {
    alert('There was an error durring the process!');
    this.setState({ errors: error })
  });
}

booksubmit = data =>{
  this.props.addBook(data).then(() => {
    alert('Book  added successfully !');
    this.setState({ isLoading: false })
  }).catch(error => {
    alert('There was an error durring the process!');
    this.setState({
       errors: error,
       isLoading:false
     })
  });
}

handleRemove = (e,i) => {
  const {showTable} = this.state;
  const {id} = e.target;
  if (id) {
    if (window.confirm("Are you sure you want to delete this record ?")) {
      showTable == 'books' ?
    this.props.remove(id).then(() => {
      alert('Item deleted')
    })
    .catch( error => {
      this.setState({ errors: error })
    }) :
    this.props.removeTitle(id).then(() => {
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
  console.log(x);
  console.log(currentBook);
  if (window.confirm("Are you sure you want to save this changes ?")) {
    this.setState({ editIdx: -1 });
  }
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
    const {isLoading, books,oldState,showTable} = this.state;
    return(
      <MuiThemeProvider>
      <div className="content">
        <div className="card" id="main-card">
        <div className="row">
            <div className="col-md-6">
              <div className="col-md-6">
                  <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.handleShow}>
                      Add New BookTitle
                    </Button>
                    <Button bsStyle="primary" onClick={this.handleShowModal}>
                      Add New Book
                    </Button>
                  </ButtonToolbar>
                    <ButtonToolbar>
                    <Modal
                      {...this.props}
                      show={this.state.show}
                      onHide={this.handleHide}
                      dialogClassName="custom-modal"
                    >
                      <Modal.Body>
                        <div className="">
                          <BookTitleform submit={this.submit}/>
                        </div>
                      </Modal.Body>
                    </Modal>
                    <Modal
                      {...this.props}
                      show={this.state.showModal}
                      onHide={this.handleHideModal}
                      dialogClassName="custom-modal"
                    >
                      <Modal.Body>
                        <div className="">
                          <BookForm submit={this.booksubmit}/>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </ButtonToolbar>
              </div>
              <div className="col-md-6">
                <SelectField
                style={{ marginLeft: "1em" }}
                floatingLabelText="Select category"
                value={this.state.showTable}
                onChange={(event, index, value) =>
                  this.setState({
                    showTable: value,
                    editIdx: -1,
                    columnToSort: "",
                    sortDirection: "desc",
                    query: "",
                    columnToQuery: "",
                    editStudId:'',
                    edited:false,
                   })
                }
                >
                <MenuItem value="books" primaryText="Books" />
                <MenuItem value="bookTitles" primaryText="Book Title" />
                </SelectField>
              </div>
            </div>
         </div>
         {
           showTable == 'books' ?
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
          </div> :
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
                 handleRemove={this.handleRemove}
                 startEditing={this.startEditing}
                 editIdx={this.state.editIdx}
                 stopEditing={this.stopEditing}
                 handleSave={this.handleSave}
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
             </div>
             </div>
           </div>
           <div className="card-footer">
           </div>
         </div>
         }
       </div>
      </div>
      </MuiThemeProvider>
    )
}
}


const mapStateToProps = state => ({
  books:state.books,
  bookTitles:state.titles
});

export default connect(mapStateToProps,{addBook,addTitle,remove,edit,removeTitle})(Books);
