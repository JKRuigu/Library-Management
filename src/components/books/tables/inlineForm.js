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
      currentBook:props.currentBook,
      errors: {
        bookAccession: ""
      },
      edited:false
    };
  }

  change = e => {
    const { name, value } = e.target;
    console.log(value);
    console.log(this.state.values);
    console.log(name);
    this.setState(state => ({
      edited:true
    }));
  };

  validate = () => {
    let isError = false;
    const errors = {
      bookAccession: ""
    };

    this.setState({
      errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.handleSave(this.props.i, this.state.values,this.state.edited,this.state.currentBook);
    }
  };

  render() {
    const { titles, x, i } = this.props;
    return [
      titles.map((y, k) => (
        <td key={`trc-${k}`}>
          <input
            autocomplete="off"
            list={y.prop == 'bookTitle' ? "datalist1" : ''}
            type={y.type}
            name={y.prop}
            onChange={this.change}
            value={ y.prop == 'bookTitle' ? this.state.values.orderdetails[0].bookTitle : this.state.values[y.prop] }
            errorText={this.state.errors[y.prop]}
          />
        </td>
      )),
      <td><CheckIcon onClick={this.onSubmit} style={{cursor: "pointer"}}/></td>,
      <td><CancelIcon onClick={this.props.stopEditing} style={{cursor: "pointer"}}/></td>
    ];
  }
}
