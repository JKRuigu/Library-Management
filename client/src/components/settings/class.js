import React from "react";
import axios from 'axios';

class ClassForm extends React.Component {
      state = {
      data:{}
    };

    submit = ()=> {
      let data = this.state.data;
      console.log(data);
      axios.post(`/settings/add/classes`,data)
      .then(res => {
        console.log(res.data);
      });
    };

    handleChange  = (e)=> {
      this.setState({ data : { ...this.state.data, [e.target.name]: e.target.value } });
    };
    render(){
  return(
            <form className="form-inline"  onSubmit={this.submit}>
              <div className="form-group mx-sm-3 mb-2">
                <label for="stream" className="sr-only">Add Stream</label>
                <input type="text" name="stream"	onChange={this.handleChange} className="form-control" placeholder="Enter a stream Name" />
              </div>
              <button type="submit" className="btn btn-primary ">Add</button>
            </form>
  )
}
}

export default ClassForm;
