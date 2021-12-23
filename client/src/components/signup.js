import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import bcrypt from 'bcryptjs';

import { withRouter } from "react-router";

class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCountryCode = this.onChangeCountryCode.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassportNo = this.onChangePassportNo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      countrycode: "",
      tel: "",
      email: "",
      passportNo: "",
    };
  }

  // These methods will update the state properties.
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  
  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }
  
  onChangeCountryCode(e) {
    this.setState({
      countrycode: e.target.value,
    });
  }

  onChangeTel(e) {
    this.setState({
      tel: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassportNo(e) {
    this.setState({
      passportNo: e.target.value,
    });
  }

// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new user(newuser) to the database.
    const newuser = {
      username: this.state.username,
      password: bcrypt.hashSync(this.state.password,10),
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      address: this.state.address,
      countrycode: this.state.countrycode,
      tel: this.state.tel,
      email: this.state.email,
      passportNo: this.state.passportNo,
    };

    axios
      .post("http://localhost:5000/user/add", newuser)
      .then((res) => console.log(res.data));


    // We will empty the state after posting the data to the database
    this.setState({
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      countrycode: "",
      tel: "",
      email: "",
      passportNo: "",
    });

    this.props.history.push("/");
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Signup</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label>First name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.firstname}
              onChange={this.onChangeFirstName}
            />
          </div>
          <div className="form-group">
            <label>Last Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.lastname}
              onChange={this.onChangeLastName}
            />
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <label>Country Code: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.countrycode}
              onChange={this.onChangeCountryCode}
            />
          </div>
          <div className="form-group">
            <label>Telephone number: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.tel}
              onChange={this.onChangeTel}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Passport Number: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.passportNo}
              onChange={this.onChangePassportNo}
            />
          </div>
          <br />
          
          <div className="form-group">
            <input
              type="submit"
              value="Signup"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Create);
