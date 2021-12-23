import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

import { withRouter } from "react-router";
import bcrypt from 'bcryptjs';

class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: sessionStorage.getItem('username'),
      password: "",
      newpassword: "",
    };
  }

  // These methods will update the state properties.
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeNewPassword(e) {
    this.setState({
      newpassword: e.target.value,
    });
  }

// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new user(newuser) to the database.
    const user = {
      username: this.state.username,
      password: this.state.password,
      newpassword: bcrypt.hashSync(this.state.newpassword,10)
    };
    var tmp = this;
    
    axios
      .post("http://localhost:5000/user/login", user)
      .then(function (response) {
        if(response.data && bcrypt.compareSync(user.password,response.data.password)){
          axios.post("http://localhost:5000/user/changePass", user)
          tmp.props.history.push("/userHome");
        }else{
          alert("wrong password")
        }
      });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Change Password</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Old Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label>New Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.newpassword}
              onChange={this.onChangeNewPassword}
            />
          </div>
          
          <div className="form-group">
            <input
              type="submit"
              value="Save"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Create);
