import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import axios from 'axios';
import AdmDataList from '../dashboard/borrow/search/datalist'
import AccDataList from '../dashboard/borrow/search/bookDatalist'
import StudBorrForm from '../dashboard/borrow/form/student'
import BookBorrowForm from '../dashboard/borrow/form/book'

class Dashboard extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: true,
           studBorrow: [],
           studentDash:[],
           bookDash:[],
           bookBorrow:[],
           errors: [],
           query: "",
           bkQuery:"",
           columnToQuery: "admissionDate",
           studBorrowAva:false,
           bookBorrowAva:false,
           bookBorrowed:[]
       }
       this.handleStudentQueryChange = this.handleStudentQueryChange.bind(this);
       this.handleBookQueryChange = this.handleBookQueryChange.bind(this);
   }

componentWillMount() {
     localStorage.getItem('studentDash') && localStorage.getItem('bookDash')&& this.setState({
         bookDash: JSON.parse(localStorage.getItem('bookDash')),
         studentDash: JSON.parse(localStorage.getItem('studentDash')),
         isLoading: false
     })

 }

componentDidMount(){
 !localStorage.getItem('studentDash') && !localStorage.getItem('bookDash')? this.fetchData() :console.log(`Using data from localStorage that `);}

componentWillUpdate(nextProps, nextState) {
     localStorage.setItem('studentDash', JSON.stringify(nextState.studentDash));
     localStorage.setItem('bookDash', JSON.stringify(nextState.bookDash));
 }

fetchData(){
 axios.get(`/api/fetch/students`)
   .then(res => {
     this.setState({
        studentDash:res.data.data,
        isLoading: false
      });
   });
   axios.get(`/api/fetch/borrowing/books`)
   .then(res => {
     this.setState({
       bookDash:res.data.data,
       isLoading: false
     });
   });
}

 handleStudentQueryChange(e) {
   const {studBorrow,studentDash,studBorrowAva } = this.state
   this.setState({query:e.target.value})
   const result = studentDash.filter(x => x.adminNo == e.target.value)
   result.length == 1 ?
    this.setState({
      studBorrow:result,
      studBorrowAva:true
    })
    : this.setState({studBorrowAva:false})
 }

 handleBookQueryChange(e) {
   this.setState({bkQuery:e.target.value})
   const {bookBorrowed,bookDash,bookBorrowAva } = this.state
   const results = bookDash.filter(x => x.bookAccession == e.target.value)
   results.length == 1 ?
    this.setState({
      bookBorrowed:results,
      bookBorrowAva:true
    })
    : this.setState({bookBorrowAva:false})
 }

  render(){
    const lowerCaseQuery = this.state.query.toLowerCase();
    const {isLoading, students,studentDash,query,studBorrow,studBorrowAva,bookBorrowAva} = this.state;
      console.log(studBorrow)
    return(
          <div className="content">
            <div className="content-main">
                <div className="card">
                <div className="row">
                  <div className="col-md-6">
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
                          <AdmDataList students={this.state.studentDash}/>
                        </div>
                    </div>
                  <div className="card-body">
                  <h1 className="text-center">{!studBorrowAva ? 'No results':''}</h1>
                    {<StudBorrForm
                      students={this.state.studBorrow}
                      studBorrowAva={this.state.studBorrowAva} />}
                  </div>
                </div>
                  <div className="col-md-6">
                    <div className="card-head" style={{ display: "flex"}}>
                        <div className="row" style={{ display: "flex", margin: "auto" }}>
                        <TextField
                           autocomplete="off"
                           list="datalist3"
                           hintText="Search.."
                           floatingLabelText="Enter Book Accession Number"
                           value={this.state.bkQuery}
                           onChange={this.handleBookQueryChange}
                           floatingLabelFixed
                         />
                          <AccDataList books={this.state.bookDash}/>
                        </div>
                    </div>
                  <div className="card-body">
                  <h1 className="text-center">{!bookBorrowAva ? 'No results':''}</h1>
                    {<BookBorrowForm
                      books={this.state.bookBorrowed}
                      bookBorrowAva={this.state.bookBorrowAva} />}
                  </div>
                </div>
              </div>
              <div className="row"><h1>Table</h1></div>
             </div>
            </div>
          </div>
    )
  }
}

export default Dashboard;
