import React from "react";

class StudentForm extends React.Component {
      state = {
      data:{}
    };

    submit = ()=> {
      this.props.submit(this.state.data);
      console.log(this.state.data)
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
                        <option selected value="North">North</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="South">South</option>
                      </select>
                    </div>
              </div>
              <div className="col-sm-6">
                  <div className="form-group">
                        <label data-toggle="tooltip">Stream </label>
                        <select name="stream"	onChange={this.handleChange} className="selectOption">
                          <option selected value="1">1</option>
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
