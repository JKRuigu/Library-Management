import React from "react";
import { connect } from 'react-redux';
import TextField from "material-ui/TextField";

class StudentForm extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           data:{}
       }
   }

    submit = ()=> {
      this.props.submit(this.state.data);
    };

    handleChange  = (e)=> {
      this.setState({ data : { ...this.state.data, [e.target.name]: e.target.value } });
    };

render(){
    return(
      <form onSubmit={this.submit}>
        <div className="row">
              <div className="col-sm-4">
                  <div className="form-group">
                      <label data-toggle="tooltip">Admission Number</label>
                      <input type="text"  autocomplete="off" name="adminNo"	onChange={this.handleChange} className="form-control"  required/>
                  </div>
              </div>
              <div className="col-sm-8">
                  <div className="form-group">
                      <label data-toggle="tooltip">Student Name</label>
                      <input type="text" required autocomplete="off" name="studentName"	onChange={this.handleChange} className="form-control"  required/>
                  </div>
              </div>
          </div>
          <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label data-toggle="tooltip">Stream</label><br/>
                        <select name="stream" required 	onChange={this.handleChange} className="selectOption">
                        <option selected  value="" style={{display:"none"}}></option>
                        {
                          this.props.streams.map((x,i) =>(
                            <option key={`opt-${i}`} value={x}>{x}</option>
                          ))
                        }
                        </select>
                      </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label data-toggle="tooltip">Class</label><br/>
                        <select name="form" required	onChange={this.handleChange} className="selectOption">
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
                        <input type="date" required autocomplete="off" name="admissionDate"	onChange={this.handleChange} className="form-control" required/>
                    </div>
                </div>
            </div>
            <button className="btn btn-info btn-block" type="submit">Submit</button>
            </form>
    )
  }
}
const mapStateToProps = state => ({
    streams: state.config
});

export default connect(mapStateToProps)(StudentForm);
