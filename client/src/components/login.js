import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

import { withRouter } from "react-router";
import bcrypt from 'bcryptjs';

class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
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

// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new user(newuser) to the database.
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    var tmp = this;
    
    axios
      .post("http://localhost:5000/user/login", user)
      .then(function (response) {
        if(response.data && bcrypt.compareSync(user.password,response.data.password)){
          sessionStorage.setItem('username', user.username);
          if(user.username === "admin"){
            tmp.props.history.push("/notadmin");
          }else{
            tmp.props.history.push("/userHome");
          }
          tmp.setState({
            username: "",
            password: "",
          });
        }else{
          alert("wrong username or password")
        }
      });
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
            <input
              type="submit"
              value="Login"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Create);
