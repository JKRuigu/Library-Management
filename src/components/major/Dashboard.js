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
           studBorrowAva:false
       }
       this.handleStudentQueryChange = this.handleStudentQueryChange.bind(this);
       this.handleBookQueryChange = this.handleBookQueryChange.bind(this);
   }

componentWillMount() {
     localStorage.getItem('studentDash') && this.setState({
         studentDash: JSON.parse(localStorage.getItem('studentDash')),
         isLoading: false
     })

 }

componentDidMount(){
 !localStorage.getItem('studentDash') ? this.fetchData() :console.log(`Using data from localStorage that `);}

componentWillUpdate(nextProps, nextState) {
     localStorage.setItem('studentDash', JSON.stringify(nextState.studentDash));
 }

fetchData(){
 axios.get(`/api/fetch/students`)
   .then(res => {
     this.setState({
        studentDash:res.data.data,
        isLoading: false
      });
   });
}

fetchBooks(){
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
   result.length == 1 ? console.log(result[0].adminNo) ||
    this.setState({
      studBorrow:result,
      studBorrowAva:true
    })
    : this.setState({studBorrowAva:false})
 }

 handleBookQueryChange(e) {
   this.setState({bkQuery:e.target.value})
 }

  render(){
    const lowerCaseQuery = this.state.query.toLowerCase();
    const {isLoading, students,studentDash,query,studBorrow,studBorrowAva} = this.state;
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
                    {<StudBorrForm students={this.state.studBorrow} studBorrowAva={this.state.studBorrowAva} />}
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
                  </div>
                </div>
              </div>
             </div>
            </div>
          </div>
    )
  }
}

export default Dashboard;
