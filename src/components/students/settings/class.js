import React from "react";
import axios from 'axios';


class StreamTitles extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           streams:[]
       }
   }

   componentWillMount() {
     this.fetchData() ||
         localStorage.getItem('streams')  && this.setState({
             streams: JSON.parse(localStorage.getItem('streams')),
         })
     }

   componentDidMount(){
     console.log('chlid componentDidMount');
      !localStorage.getItem('streams')? this.fetchData():console.log(`Using data from localStorage that `);
    }
   componentWillUpdate(nextProps, nextState) {
         localStorage.setItem('streams', JSON.stringify(nextState.streams));
     }

     fetchData(){
       axios.get(`/api/fetch/stream`)
       .then(res => {
         let stream = res.data.data;
         var bookAcc = [];
         var i =0;
         stream.forEach(function (form) {
           if(form.hasOwnProperty('stream')){
               bookAcc[i] = form.stream;
               i++;
           }
         });
         this.setState({
           streams:bookAcc,
           isLoading: false
         });
       });
     }
  render(){
    const {streams} = this.state;
    return(
    <div>
    {
      streams.map((x,i) =>(
        <option key={`datalist-${i}`} value={x}>{x}</option>
      ))
    }
    </div>
    )
  }
}

export default StreamTitles;
