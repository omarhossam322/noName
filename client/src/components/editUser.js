import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";

class Edit extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePassportNumber = this.onChangePassportNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      passportNo: "",
      email: "",
    };


  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/userDetails/" + sessionStorage.getItem('username'))
      .then((response) => {
        this.setState({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          passportNo: response.data.passportNo,
          email: response.data.email,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // These methods will update the state properties.
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

  onChangePassportNumber(e) {
    this.setState({
      passportNo: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const newEditedUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      passportNo: this.state.passportNo,
      email: this.state.email,
    };
    console.log(newEditedUser);

    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/updateUser/" + sessionStorage.getItem('username'),
        newEditedUser
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/userHome");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
        <h3 align="center">Update Details</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.firstname}
              onChange={this.onChangeFirstName}
            />
          </div>
          <div className="form-group">
            <label>Last name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.lastname}
              onChange={this.onChangeLastName}
            />
          </div>
          <div className="form-group">
            <label>Passport Number: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.passportNo}
              onChange={this.onChangePassportNumber}
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
          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Details"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(Edit);
