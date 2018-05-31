import React from 'react';
// import TitleConfig from '../settings/titles';

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
            <input type="text" autocomplete="off"	onChange={this.handleChange} className="form-control" list="datalist1" name="bookTitle" placeholder="Select the book title from the dropdown list" required />
          </div>
      </div>
      </div>
      <div className="row">
            <div className="col-sm-6">
                <div className="form-group">
                    <label data-toggle="tooltip">Book Acc</label>
                    <input type="text" autocomplete="off"	onChange={this.handleChange} className="form-control" name="bookAccession" required/>
                </div>
            </div>
          <div className="col-sm-6">
              <div className="form-group">
                  <label data-toggle="tooltip">Book ISBN</label>
                  <input type="text" autocomplete="off"	onChange={this.handleChange} className="form-control" name="bookIsbn" required/>
              </div>
          </div>
        </div>
        <div className="row">
              <div className="col-sm-12">
                  <div className="form-group">
          	            <label data-toggle="tooltip">Book Condition</label>
          	            <input type="text" autocomplete="off" 	onChange={this.handleChange} className="form-control" name="bookCondition" required/>
                  </div>
              </div>
          </div>
            <input type="submit" autocomplete="off" className="btn btn-info btn-block"/>
          </form>
      )
  }
}

export default bookForm;
