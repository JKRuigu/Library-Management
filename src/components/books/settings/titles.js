import React from "react";
import { connect } from 'react-redux';

class TitleConfig extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           titles:[]
       }
   }
//
// componentDidMount(){
//   let books = this.props.titles;
//   console.log(this.props.titles);
//   console.log(this.state.titles );
//   var booksTitles = [];
//   var i =0;
//   console.log(books);
//   console.log('componentDidMount');
//   books.forEach(function (book) {
//     if(book.hasOwnProperty('bookTitle')){
//       console.log(book);
//         booksTitles[i] = book.bookTitle;
//         i++;
//     }
//   });
//   this.setState({
//     titles1:booksTitles,
//     isLoading: false
//   });
//   console.log(booksTitles);
// }

  render(){
    return(
    <div>
    <datalist id="datalist1">
    {
      console.log(this.props.titles)||      
      console.log(this.props.books)
    }
    </datalist>
    </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.titles);
    titles:state.titles
    books:state.books
};

export default connect(mapStateToProps)(TitleConfig);
