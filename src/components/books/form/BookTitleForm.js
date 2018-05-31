import React from 'react';

class bookTitleForm extends React.Component {
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
            <div className="col-sm-6">
                <div className="form-group">
                    <label data-toggle="tooltip">Book Title</label>
                    <input type="text" autocomplete="off"  onChange={this.handleChange} className="form-control" name="bookTitle"  required/>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label data-toggle="tooltip">Book Author</label>
                    <input type="text" autocomplete="off"	onChange={this.handleChange} className="form-control" name="bookAuthor" required/>
                </div>
            </div>
        </div>
        <div className="row">
              <div className="col-sm-6">
                  <div className="form-group">
                      <label data-toggle="tooltip">Book Section</label>
                      <input type="text" autocomplete="off" 	onChange={this.handleChange} className="form-control" name="bookSection"  required/>
                  </div>
              </div>
              <div className="col-sm-6">
                  <div className="form-group">
          	            <label data-toggle="tooltip">Book Category</label>
          	            <input type="text" autocomplete="off"	onChange={this.handleChange} className="form-control" name="bookCategory" required/>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-sm-8">
                  <div className="form-group">
                      <label data-toggle="tooltip">Publisher</label>
                      <input type="publisher" autocomplete="off"	onChange={this.handleChange} className="form-control"  name="bookPublisher" required/>
                  </div>
              </div>
              <div className="col-sm-4">
                  <div className="form-group">
                      <label data-toggle="tooltip">No. Copies</label>
                      <input type="number" autocomplete="off"	onChange={this.handleChange} name="numberOfCopies" className="form-control" required/>
                  </div>
              </div>
            </div>
            <input type="submit" className="btn btn-info btn-block"/>
          </form>
      )
  }
}

export default bookTitleForm;
