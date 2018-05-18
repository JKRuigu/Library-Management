import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import axios from 'axios';


class StudSearch extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: true,
           studBorrow: [],
           studentDash:[],
           bookBorrow:[],
           errors: [],
           query: "",
           columnToQuery: "admissionDate",
       }
   }

componentWillMount() {
 console.log('componentWillMount') ||
     localStorage.getItem('studentDash') && this.setState({
         studentDash: JSON.parse(localStorage.getItem('studentDash')),
         isLoading: false
     })

 }

componentDidMount(){
 console.log('componentDidMount') ||
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

  render(){
    const lowerCaseQuery = this.state.query.toLowerCase();
    const {isLoading, students} = this.state;
    return(
          <div>
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
                       <MenuItem value="adminNo" primaryText="Admission Number" />
                       <MenuItem value="studentName" primaryText="Student Name" />
                     </SelectField>
          </div>
    )
  }
}

export default StudSearch;
