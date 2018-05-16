import React from "react";
import axios from 'axios';
import TextField from "material-ui/TextField";


class TitleConfig extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           titles:[]
       }
   }

   componentWillMount() {
     this.fetchData() ||
         localStorage.getItem('titles')  && this.setState({
             titles: JSON.parse(localStorage.getItem('titles')),
         })
     }

   componentDidMount(){
      !localStorage.getItem('titles')? this.fetchData():console.log(`Using data from localStorage that `);
    }
   componentWillUpdate(nextProps, nextState) {
         localStorage.setItem('titles', JSON.stringify(nextState.titles));
     }

     fetchData(){
       axios.get(`/settings/books/titles`)
       .then(res => {
         let titles = res.data.data;
         const {bookTitle} = titles
         var bookAcc = [];
         var i =0;
         titles.forEach(function (book) {
           if(book.hasOwnProperty('bookTitle')){
               bookAcc[i] = book.bookTitle;
               i++;
           }
         });

         this.setState({
           titles:bookAcc,
           isLoading: false
         });
       });
     }
  render(){
    const {titles} = this.state;
    return(
    <div>
    <datalist id="datalist1">
    {
      titles.map((x,i) =>(
        <option key={`datalist-${i}`} value={x}></option>
      ))
    }
    </datalist>
    </div>
    )
  }
}

export default TitleConfig;
