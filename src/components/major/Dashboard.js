import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import axios from 'axios';
import AdmDataList from '../dashboard/borrow/search/datalist'
import AccDataList from '../dashboard/borrow/search/bookDatalist'
import ButtonIssue from '../dashboard/borrow/button/button'
import StudBorrForm from '../dashboard/borrow/form/student'
import BookBorrowForm from '../dashboard/borrow/form/book'

class Dashboard extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: true,
           studBorrow: [],
           bookBorrow:[],
           errors: [],
           query: "",
           bkQuery:"",
           columnToQuery: "admissionDate",
           studBorrowAva:false,
           bookBorrowAva:false,
           bookBorrowed:[]
       }
       console.log(this.props.students)
       this.handleStudentQueryChange = this.handleStudentQueryChange.bind(this);
       this.handleBookQueryChange = this.handleBookQueryChange.bind(this);
   }

fetchData(){
   axios.get(`/api/fetch/borrowing/books`)
   .then(res => {
     this.setState({
       bookDash:res.data.data,
       isLoading: false
     });
   });
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
   let studIdNum = studBorrow[0]._id
   let BookAcc = bookBorrowed[0].bookAccession
   let data = {adminNo:studIdNum}
   axios.post(`/process/borrow/${BookAcc}/issue`,data)
   .then(res => {
     console.log(res.status)
   });

 };

  render(){
    const lowerCaseQuery = this.state.query.toLowerCase();
    const {isLoading, students,studentDash,query,studBorrow,studBorrowAva,bookBorrowAva} = this.state;
    return(
          <div className="content">
                <div className="card" id="main-card">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card-head" style={{ display: "flex"}}>
                        <div className="row" style={{ display: "flex", margin: "auto" }}>
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
                    {<StudBorrForm
                      students={this.props.students}
                      studBorrowAva={this.state.studBorrowAva} />}
                  </div>
                </div>
                  <div className="col-lg-6">
                    <div className="card-head" >
                    <div className="row">
                        <div className="col-md-6" style={{paddingLeft: "100px"}}>
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
                          <div className="col-md-6" style={{paddingLeft:"100px",margin: "auto"}}>
                            <ButtonIssue
                              book={this.state.studBorrowAva}
                              student={this.state.bookBorrowAva}
                              issueBook={this.issueBook}

                            />
                          </div>
                      </div>
                    </div>
                  <div className="card-body">
                    {<BookBorrowForm
                      books={this.state.bookBorrowed}
                      bookBorrowAva={this.state.bookBorrowAva} />}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="container-fluid">
                  <div className="card"><h1>Table</h1></div>
                </div>
              </div>
             </div>
          </div>
    )
  }
}
const mapStateToProps = state => ({
    students: state.students,
    books:state.books
});

export default connect(mapStateToProps,{})(Dashboard);
