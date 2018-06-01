import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import orderBy from "lodash/orderBy";
import { fetchBooks} from '../../../actions/books.js';
import { bookIssue} from '../../../actions/students.js';
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
import Moment from 'react-moment';

class Borrow extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          isLoading: false,
          studBorrow: [],
          studBorrowedBooks:[],
          bookBorrow:[],
          errors: [],
          query: "",
          bkQuery:"",
          columnToQuery: "admissionDate",
          studBorrowAva:false,
          bookBorrowAva:false,
          bookBorrowed:[],
          borrow:true,
          borrowPeriod:5,
          maxBooks:5
      }
    this.handleStudentQueryChange = this.handleStudentQueryChange.bind(this);
    this.handleBookQueryChange = this.handleBookQueryChange.bind(this);
  }

handleStudentQueryChange(e) {
    // let books = this.props.books.filter(x => x.isAvailable == true)
    // this.setState({bookBorrow:books})
     const {studBorrow,studBorrowAva,bookBorrow } = this.state
     this.setState({query:e.target.value})
     let result = this.props.students.filter(x => x.adminNo == e.target.value)
      var myBooks = [];
      var i =0;
    if (result.length ===1 || result.length !==0) {
        this.setState({
          studBorrow:result,
          studBorrowAva:true
        })
      if(result[0].hasOwnProperty('myBooks')){
        let borrowedBooks = result[0].myBooks;
         this.setState({studBorrowedBooks:borrowedBooks})
      }else {
        this.setState({studBorrowedBooks:[]})
      }
    }else {
      this.setState({
        studBorrow:[],
        studBorrowedBooks:[],
        studBorrowAva:false
      })
    }
}

handleBookQueryChange(e) {
   this.setState({bkQuery:e.target.value})
   const {bookBorrowed,bookBorrowAva } = this.state
   let results = this.props.AvailbleBooks.filter(x => x.bookAccession == e.target.value)
   results.length == 1 ?
    this.setState({
      bookBorrowed:results,
      bookBorrowAva:true
    })
    : this.setState({bookBorrowAva:false})
}

issueBook = () => {
   const {studBorrow,bookBorrowed} = this.state;
   if (this.state.studBorrowedBooks.length >= this.state.maxBooks) {
     alert('Sorry,the student have reached the maximum borrow limit.');
   }else {
     let studId = studBorrow[0]._id
     let BookAcc = bookBorrowed[0].bookAccession
     const startDate = Date.now() - 1000*60*60*24*6
     const deadLine = startDate + 1000*360*24*2
     let data = {studId,BookAcc,startDate,deadLine}
     if (!data=='') {
       this.setState({isLoading:true})
       this.props.bookIssue(data).then( () => {
         this.setState({
           isLoading:false,
           bookBorrowed:[],
           studBorrowAva:false,
           bookBorrowAva:false,
           query: "",
           bkQuery:"",
           studBorrow:[],
           studBorrowedBooks:[]
         });
         alert('Book issued successfully.');
       }).catch( error => {
         alert('An error occured,please try again.');
       });
     }
   }
};

render(){
    const lowerCaseQuery = this.state.query.toLowerCase();
    const {isLoading, students,studentDash,query,studBorrow,studBorrowAva,bookBorrowAva,borrow} = this.state;
    return(
<div>
      <div className={isLoading ? 'loading' :"row"}>
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
                        students={this.state.studBorrow}
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
                      <AccDataList books={this.props.AvailbleBooks}/>
                  </div>
                  <div className="col-md-6" style={{paddingLeft:"100px",margin:"auto"}}>
                      {
                        isLoading?
                        <button type="button" className="btn btn-success loading " style={{height:"50px",width:"100px"}} >loading...</button>
                         :
                        <ButtonIssue
                            book={this.state.studBorrowAva}
                            student={this.state.bookBorrowAva}
                            issueBook={this.issueBook}
                         />
                      }
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
      books={this.state.studBorrowedBooks}
      studBorrowAva={this.state.studBorrowAva}
      titles={[
        {
          name: "Book Accession No:",
          prop: "bookAcc"
        },
        {
          name: "Date Borrowed",
          prop: "dateIssued"
        },
        {
          name: "Deadline",
          prop: "deadLine"
        },
        {
          name: "Over Due(Days)"
        }
      ]}
    />
</div>
  )
 }
}
function mapStateToProps(state){
  const result = state.books.filter(book => book.isAvailable == true );
  return{
    AvailbleBooks:result,
    books: state.books,
    students:state.students
  };
}

export default connect(mapStateToProps,{bookIssue,fetchBooks})(Borrow);
