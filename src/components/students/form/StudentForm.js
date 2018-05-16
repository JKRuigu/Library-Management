import React from "react";
import axios from 'axios';

class StudentForm extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           stream:[],
           data:{}
       }
   }

   componentWillMount() {
     this.fetchData() ||
         localStorage.getItem('stream')  && this.setState({
             stream: JSON.parse(localStorage.getItem('stream')),
         })
     }

   componentDidMount(){
     console.log('chlid componentDidMount');
      !localStorage.getItem('stream')? this.fetchData():console.log(`Using data from localStorage that `);
    }
   componentWillUpdate(nextProps, nextState) {
         localStorage.setItem('stream', JSON.stringify(nextState.stream));
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
           stream:bookAcc,
           isLoading: false
         });
       });
     }
    submit = ()=> {
      this.props.submit(this.state.data);
      console.log(this.state.data)
    };

    handleChange  = (e)=> {
      this.setState({ data : { ...this.state.data, [e.target.name]: e.target.value } });
    };
    render(){
      const {stream} = this.state;
  return(
    <form onSubmit={this.submit}>
      <div className="row">
            <div className="col-sm-4">
                <div className="form-group">
                    <label data-toggle="tooltip">Student Adm No</label>
                    <input type="number" name="adminNo"	onChange={this.handleChange} className="form-control" required="" id="searchBookAcc"  />
                </div>
            </div>
            <div className="col-sm-8">
                <div className="form-group">
                    <label data-toggle="tooltip">Student Name</label>
                    <input type="text" name="studentName"	onChange={this.handleChange} className="form-control" required="" id="searchBookTitle" />
                </div>
            </div>
        </div>
        <div className="row">
              <div className="col-sm-6">
                  <div className="form-group">
                      <label data-toggle="tooltip">Class</label><br/>
                      <select name="form"	onChange={this.handleChange} className="selectOption">
                      <option selected  value="" style={{display:"none"}}></option>
                      {
                        stream.map((x,i) =>(
                          <option key={`opt-${i}`} value={x}>{x}</option>
                        ))
                      }
                      </select>
                    </div>
              </div>
              <div className="col-sm-6">
                  <div className="form-group">
                        <label data-toggle="tooltip">Stream </label>
                        <select name="stream"	onChange={this.handleChange} className="selectOption">
                          <option selected  value="" style={{display:"none"}}></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-sm-12">
                  <div className="form-group">
                      <label data-toggle="tooltip">Admission Date</label>
                      <input type="date" name="admissionDate"	onChange={this.handleChange} className="form-control" required="" id="searchPublisher" />
                  </div>
              </div>
          </div>
          <button className="btn btn-info btn-block" type="submit">Submit</button>
          </form>
  )
}
}

export default StudentForm;
