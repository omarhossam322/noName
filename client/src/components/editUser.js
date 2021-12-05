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
      first_name: "",
      last_name: "",
      passport_number: "",
      email: "",
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/userDetails/" + "user1")
      .then((response) => {
        this.setState({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          passport_number: response.data.passport_number,
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
      first_name: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value,
    });
  }

  onChangePassportNumber(e) {
    this.setState({
      passport_number: e.target.value,
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
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      passport_number: this.state.passport_number,
      email: this.state.email,
    };
    console.log(newEditedUser);

    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/updateUser/" + "user1",
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
              value={this.state.first_name}
              onChange={this.onChangeFirstName}
            />
          </div>
          <div className="form-group">
            <label>Last name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.last_name}
              onChange={this.onChangeLastName}
            />
          </div>
          <div className="form-group">
            <label>Passport Number: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.passport_number}
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
