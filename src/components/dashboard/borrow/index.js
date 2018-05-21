import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import orderBy from "lodash/orderBy";
import { bookIssue,fetchBooks} from '../../../actions/books.js';
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import axios from 'axios';
import AdmDataList from './search/datalist'
import AccDataList from './search/bookDatalist'
import ButtonIssue from './button/button'
import StudBorrForm from './form/student'
import BookBorrowForm from './form/book'
import { fetch } from '../../../actions/students';
import Store from '../../../store';
import Table from './table';

class Borrow extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          isLoading: false,
          studBorrow: [],
          bookBorrow:[],
          errors: [],
          query: "",
          bkQuery:"",
          columnToQuery: "admissionDate",
          studBorrowAva:false,
          bookBorrowAva:false,
          bookBorrowed:[],
          borrow:true
      }
    this.handleStudentQueryChange = this.handleStudentQueryChange.bind(this);
    this.handleBookQueryChange = this.handleBookQueryChange.bind(this);
  }

handleStudentQueryChange(e) {
     const {studBorrow,studBorrowAva } = this.state
     this.setState({query:e.target.value})
     const result = this.props.students.filter(x => x.adminNo == e.target.value)
     result.length == 1 ?
      this.setState({
        studBorrow:result,
        studBorrowAva:true
      })
      : this.setState({studBorrowAva:false})
}

handleBookQueryChange(e) {
   this.setState({bkQuery:e.target.value})
   const {bookBorrowed,bookBorrowAva } = this.state
   const results = this.props.books.filter(x => x.bookAccession == e.target.value)
   results.length == 1 ?
    this.setState({
      bookBorrowed:results,
      bookBorrowAva:true
    })
    : this.setState({bookBorrowAva:false})
}

issueBook = () => {
   const {studBorrow,bookBorrowed} = this.state;
   let studId = studBorrow[0]._id
   let BookAcc = bookBorrowed[0].bookAccession
   let data = {studId,BookAcc}
   console.log(data);
   this.setState({ isLoading: true })
   if (!data=='') {
     this.props.bookIssue(data).then( () => {
       Store.dispatch(fetch());
       Store.dispatch(fetchBooks());
       this.setState({ isLoading: false })
     }).catch( error => {
       this.setState({ errors: error })
     });
   }
   this.setState({ isLoading: false })
};

render(){
    const lowerCaseQuery = this.state.query.toLowerCase();
    const {isLoading, students,studentDash,query,studBorrow,studBorrowAva,bookBorrowAva,borrow} = this.state;
    return(
<div>
      <div className="row">
      <div className="col-lg-6">
          <div className="card-head" style={{ display:"flex"}}>
              <div className="row" style={{ display:"flex", margin: "auto" }}>
                  <TextField
                      autocomplete="off"
                      list="datalist2"
                      hintText="Search.."
                      floatingLabelText="Enter Student Admission Number"
                      value={this.state.query}
                      onChange={this.handleStudentQueryChange}
                      floatingLabelFixed
                   />
                  <AdmDataList students={this.props.students}/>
              </div>
          </div>
          <div className="card-body">
              {
                  <StudBorrForm
                      students={this.props.students}
                      studBorrowAva={this.state.studBorrowAva}
                  />
              }
          </div>
      </div>
      <div className="col-lg-6">
          <div className="card-head">
              <div className="row">
                  <div className="col-md-6" style={{paddingLeft:"100px"}}>
                      <TextField
                          autocomplete="off"
                          list="datalist3"
                          hintText="Search.."
                          floatingLabelText="Enter Book Accession Number"
                          value={this.state.bkQuery}
                          onChange={this.handleBookQueryChange}
                          floatingLabelFixed
                      />
                      <AccDataList books={this.props.books}/>
                  </div>
                  <div className="col-md-6" style={{paddingLeft:"100px",margin:"auto"}}>
                      <ButtonIssue
                          book={this.state.studBorrowAva}
                          student={this.state.bookBorrowAva}
                          issueBook={this.issueBook}
                      />
                  </div>
              </div>
          </div>
          <div className="card-body">
              {
                  <BookBorrowForm
                          books={this.state.bookBorrowed}
                          bookBorrowAva={this.state.bookBorrowAva}
                  />
              }
          </div>
        </div>
  </div>
    <Table
      student={this.state.studBorrow}
      studBorrowAva={this.state.studBorrowAva}
      titles={[
        {
          name: "Book Accession No:",
          prop: "bookAccession"
        },
        {
          name: "Date Borrowed",
          prop: "Date Borrowed"
        }
      ]}
    />
  </div>
  )
 }
}

function mapStateToProps(state){
    return{
        books: state.books,
        students:state.students
    };
}

export default connect(mapStateToProps,{bookIssue})(Borrow);
