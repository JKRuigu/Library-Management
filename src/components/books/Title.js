import React from "react";
import { connect } from 'react-redux';
import { editTitle} from '../../actions/titles.js';
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import BookTitleTable from '../books/tables/titles'

const invertDirection = {
  asc: "desc",
  desc: "asc"
};


class Titles extends React.Component {
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
           showTable:'books'
      }
}

startEditing = i => {
  this.setState({ editIdx: i });
};

stopEditing = () => {
    this.setState({ editIdx: -1 });
};

handleSaveTitle = (i, x,edited) => {
    if (edited) {
      if (window.confirm("Are you sure you want to save this changes ?")) {
        this.setState({isLoading:true});
        this.props.editTitle(x).then(() => {
          this.setState({isLoading:false});
          alert('Changes added successfully !');
        })
        .catch( error => {
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
    const {isLoading} = this.state;
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
             startEditing={this.startEditing}
             editIdx={this.state.editIdx}
             stopEditing={this.stopEditing}
             handleSave={this.handleSaveTitle}
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
    )
}
}


const mapStateToProps = state => ({
  bookTitles:state.titles
});

export default connect(mapStateToProps,{editTitle})(Titles);
