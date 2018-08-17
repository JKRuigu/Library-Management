import React from "react";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import CancelIcon from "material-ui/svg-icons/navigation/cancel";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        ...props.x
      },
      errors: {
        adminNo: "",
        studentName: ""
      },
      edited:false
    };
  }

  change = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value
      },
      edited:true
    }));
  };

  validate = () => {
    let isError = false;
    const errors = {
      adminNo: "",
      username: ""
    };

    const { studentName, adminNo } = this.state.values;

    if (studentName.length < 5) {
      isError = true;
      errors.studentName = "Username needs to be atleast 5 characters long";
    }

    if (adminNo.length < 2) {
      isError = true;
      errors.adminNo = "Requires valid Admission Number";
    }

    this.setState({
      errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.handleSave(this.props.i, this.state.values,this.state.edited);
    }
  };

  render() {
    const { titles, x, i } = this.props;
    return [
      titles.map((y, k) => (
        <td key={`trc-${k}`}>
          <input
            disabled={y.name == '#' ? 'false' : '' }
            type={y.type}
            name={y.prop}
            onChange={this.change}
            value={this.state.values[y.prop]}
            errorText={this.state.errors[y.prop]}
          />
        </td>
      )),
      <td><CheckIcon onClick={this.onSubmit} style={{cursor: "pointer"}}/></td>,
      <td><CancelIcon onClick={this.props.stopEditing} style={{cursor: "pointer"}}/></td>
    ];
  }
}
