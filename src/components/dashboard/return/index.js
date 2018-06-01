import React from 'react';
import { connect } from 'react-redux';
import TextField from "material-ui/TextField";
import Table from './table';
import FormStudent from '../borrow/form/student';
import AdmDataList from '../borrow/search/datalist';
import {returnBook} from '../../../actions/books';
import {chargeOverdue} from '../../../actions/overdue';

class Borrow extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          isLoading: false,
          studBorrow:[],
          studBorrowAva:false,
          bookBorrow:[],
          query:'',
          studBorrowedBooks:[]
      }
      this.handleStudentQueryChange = this.handleStudentQueryChange.bind(this);
}

handleStudentQueryChange(e) {
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

returnBooks = (e,i,x) => {
  const {studBorrowedBooks} =this.state;
  let books = this.props.books
  let returnBook = books.filter(book => book.bookAccession == x.bookAcc);
  let overDue =Math.floor((new Date() - x.deadLine)/(1000*60*60*24));
  if (overDue >= 1) {
    let id = x.bookAcc
    let data ={
      bookTitleId:returnBook[0].bookCategoryId,
      studId:this.state.studBorrow[0].adminNo,
      studName:this.state.studBorrow[0].studentName,
      days:overDue,
      bookAcc:x.bookAcc,
      id,
      studId:this.state.studBorrow[0]._id
    }
    this.props.chargeOverdue(data).then( res => {
      alert('The process was successfully.');
      let book =studBorrowedBooks.filter(x=> x._id !== studBorrowedBooks._id)
      this.setState({
        studBorrowedBooks:book
      });
    }).catch( error => {
      let book =studBorrowedBooks.filter(x=> x._id !== studBorrowedBooks._id)
      this.setState({
        studBorrowedBooks:book
      });
      alert('An error occured,please try again');
    });
  }else{
    let id = x.bookAcc
    let data ={
      id,
      studId:this.state.studBorrow[0]._id
    }
    this.props.returnBook(data).then( () => {
      let book =studBorrowedBooks.filter(x=> x._id !== studBorrowedBooks._id)
      this.setState({
        studBorrowedBooks:book
      });
      alert('The process was successfully.');
    }).catch( error => {
      alert('An error occured,please try again.');
    });
    }

};

render(){
    return(
      <div>
      <div className="row text-center"  style={{ display: "flex"}}>
        <div className="col-md-12"  style={{ display: "flex", marginLeft: "500px" }}>
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
        <div className="row">
        <div className="col-lg-6">
          <FormStudent
            students={this.state.studBorrow}
            studBorrowAva={this.state.studBorrowAva}
          />
        </div>
        <div className="col-lg-6 container-fluid" style={{width:"100%"}}>
        <div className="card">
          <div className="card-head"></div>
          <div className="card-body">
            <Table
              books={this.state.studBorrowedBooks}
              returnBooks={this.returnBooks}
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
                  name: "Overdue(days)",
                  prop: "overDue"
                }
              ]}
            />
          </div>
        </div>
        </div>
        </div>
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

export default connect(mapStateToProps,{returnBook,chargeOverdue})(Borrow);
