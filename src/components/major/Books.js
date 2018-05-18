import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from 'react-redux';
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import { titleRegister } from '../../actions/books/registration';
import { bookRegister } from '../../actions/books/registration';
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
           books: [],
           oldState:[],
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
    this.props.titleRegister(data).then( () => {
    }).catch( error => {
      this.setState({ errors: error })
    });
  }

  booksubmit = data =>{
    axios.post(`/api/book/registration`,data)
    .then(res => {
      console.log(res);
    });
  }

  componentWillMount() {
        localStorage.getItem('books') && this.setState({
            books: JSON.parse(localStorage.getItem('books')),
            isLoading: false
        })
    }

  componentDidMount(){
    this.setState({ editIdx: -1 }) ||
    !localStorage.getItem('books') ? this.fetchData():console.log(`Using data from localStorage that `)
  }

  componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('books', JSON.stringify(nextState.books));
    }

  fetchData(){
    axios.get(`/api/fetch/books`)
    .then(res => {
      this.setState({
        oldState:res.data.data,
        books:res.data.data,
        isLoading: false,
        edited:false
      });
    });
  }


  handleRemove = (e,i) => {
    const {id } = e.target;
    const {books} = this.state;
    if (id) {
      this.setState({
         isLoading:true
        });
      axios.delete(`/api/book/${id}/delete`)
      .then(res =>{
        if (res.status === 200) {
          this.setState(state => ({
        books: state.books.filter((row, j) => j !== i),
        isLoading:false
      }));
        }else if (res.status === 400) {
          this.fetchData()
        }
      })
    }
  };

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    const {isLoading, editStudId,books,edited,oldState,BookTitle} = this.state;
    if (editStudId && edited==true) {
      var studEditDetails =  books.filter(function(hero) {
          return hero._id == editStudId;
        });
      if (studEditDetails) {
        this.setState({
           isLoading:true,
           books:[]
          });
        let data = studEditDetails;
        this.setState({ editIdx: -1 });
        this.state.BookTitle === ''  ? this.setState({ BookTitle: '123' }) :
        axios.put(`/api/book/${BookTitle}/edit`,data)
          .then(res => {
            console.log(res.status);
            res.status ===200 ?
              this.fetchData() &&
              this.setState(state => ({
                isLoading:false,
                editStudId:'',
                editIdx: -1,
                edited:false,
                BookTitle:''
              }))
            :
            this.setState(state => ({
              books:oldState,
              isLoading:false,
              editStudId:'',
              editIdx: -1,
              edited:false,
              BookTitle:''
            }))
          });
      }
    }
  };

  handleChange = (e, name, i) => {
    const { value,id } = e.target;
    name == 'bookTitle' ? this.setState({ BookTitle: value })  || console.log(e.target.value) : console.log('false')
    this.setState(state => ({
      books: state.books.map(
        (row, j) => (j === i ? { ...row, [name]: value  } : row)
      ),
      editStudId:id,
      edited:true
    }));
    console.log(this.state.BookTitle)
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

            <div className="card col-md-6"><BookTitleform submit={this.submit}/></div>
            <div className="card col-md-6"><BookForm submit={this.booksubmit}/></div>
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
            <div className={`card-body ${isLoading ? 'loader' : ''}`} >
            <Table
              handleSort={this.handleSort}
              isLoading={this.state.isLoading}
              edited={this.state.edited}
              handleRemove={this.handleRemove}
              startEditing={this.startEditing}
              editIdx={this.state.editIdx}
              stopEditing={this.stopEditing}
              handleChange={this.handleChange}
              columnToSort={this.state.columnToSort}
              sortDirection={this.state.sortDirection}
              books={orderBy(
                this.state.query
                  ? this.state.books.filter(x =>
                      x[this.state.columnToQuery]
                        .toLowerCase()
                        .includes(lowerCaseQuery)
                    )
                  : this.state.books,
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

export default connect(null, {titleRegister})(Books);
