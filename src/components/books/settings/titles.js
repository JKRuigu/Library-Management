import React from "react";
import axios from 'axios';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class TitleConfig extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           titles;''
       }
   }
   componentWillMount() {
         localStorage.getItem('titles')  && this.setState({
             titles: JSON.parse(localStorage.getItem('titles')),
         })
     }
   componentDidMount(){ !localStorage.getItem('titles')? this.fetchdata():console.log(`Using data from localStorage that `);}
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

  render(){
    return(
        <h1>Hello</h1>
    )
  }
}

export default TitleConfig;
