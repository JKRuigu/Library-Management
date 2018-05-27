import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class Form extends React.Component {
  state = {
    adminNo: "",
    adminNoError: "",
    studentName: "",
    studentNameError: "",
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: ""
  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      adminNoError: "",
      studentNameError: "",
      usernameError: "",
      emailError: "",
      passwordError: ""
    };

    if (this.state.username.length < 5) {
      isError = true;
      errors.usernameError = "Username needs to be atleast 5 characters long";
    }

    if (this.state.email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Requires valid email";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        adminNo: "",
        adminNoError: "",
        studentName: "",
        studentNameError: "",
        username: "",
        usernameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: ""
      });
    }
  };

  render() {
    return (
      <form>
        <TextField
          name="adminNo"
          hintText="First name"
          floatingLabelText="First name"
          value={this.state.adminNo}
          onChange={e => this.change(e)}
          errorText={this.state.adminNoError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="studentName"
          hintText="Last Name"
          floatingLabelText="Last Name"
          value={this.state.studentName}
          onChange={e => this.change(e)}
          errorText={this.state.studentNameError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="username"
          hintText="Username"
          floatingLabelText="Username"
          value={this.state.username}
          onChange={e => this.change(e)}
          errorText={this.state.usernameError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="email"
          hintText="Email"
          floatingLabelText="Email"
          value={this.state.email}
          onChange={e => this.change(e)}
          errorText={this.state.emailError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="password"
          hintText="Password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={e => this.change(e)}
          errorText={this.state.passwordError}
          type="password"
          floatingLabelFixed
        />
        <br />
        <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />
      </form>
    );
  }
}
