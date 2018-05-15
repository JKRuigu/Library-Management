import React from 'react';

class bookForm extends React.Component {
  state = {
    data:{}
  };

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
        <div className="col-sm-12">
          <div className="form-group">
            <label data-toggle="tooltip">Book Title</label>
            <input type="text"	onChange={this.handleChange} className="form-control" name="bookTitle"/>
          </div>
      </div>
      </div>
      <div className="row">
            <div className="col-sm-6">
                <div className="form-group">
                    <label data-toggle="tooltip">Book Acc</label>
                    <input type="text"	onChange={this.handleChange} className="form-control" name="bookAccession"/>
                </div>
            </div>
          <div className="col-sm-6">
              <div className="form-group">
                  <label data-toggle="tooltip">Book ISBN</label>
                  <input type="text" 	onChange={this.handleChange} className="form-control" name="bookIsbn" />
              </div>
          </div>
        </div>
        <div className="row">
              <div className="col-sm-12">
                  <div className="form-group">
          	            <label data-toggle="tooltip">Book Condition</label>
          	            <input type="text" 	onChange={this.handleChange} className="form-control" name="bookCondition"/>
                  </div>
              </div>
          </div>
            <input type="submit" className="btn btn-info btn-block"/>
          </form>
      )
  }
}

export default bookForm;
