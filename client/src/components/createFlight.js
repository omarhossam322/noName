import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

import { withRouter } from "react-router";

class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeFlightNo = this.onChangeFlightNo.bind(this);
    this.onChangeFlightFrom = this.onChangeFlightFrom.bind(this);
    this.onChangeFlightTo = this.onChangeFlightTo.bind(this);
    this.onChangeFlightDate = this.onChangeFlightDate.bind(this);
    this.onChangeFlightCabin = this.onChangeFlightCabin.bind(this);
    this.onChangeFlightSeats = this.onChangeFlightSeats.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      flight_no: "",
      flight_from: "",
      flight_to: "",
      flight_date: "",
      flight_cabin: "",
      flight_seats: "",
    };
  }

  // These methods will update the state properties.
  onChangeFlightNo(e) {
    this.setState({
      flight_no: e.target.value,
    });
  }

  onChangeFlightFrom(e) {
    this.setState({
      flight_from: e.target.value,
    });
  }

  onChangeFlightTo(e) {
    this.setState({
      flight_to: e.target.value,
    });
  }

  onChangeFlightDate(e) {
    this.setState({
      flight_date: e.target.value,
    });
  }

  onChangeFlightCabin(e) {
    this.setState({
      flight_cabin: e.target.value,
    });
  }

  onChangeFlightSeats(e) {
    this.setState({
      flight_seats: e.target.value,
    });
  }

// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new flight(newflight) to the database.
    const newflight = {
      flight_no: this.state.flight_no,
      flight_from: this.state.flight_from,
      flight_to: this.state.flight_to,
      flight_date: this.state.flight_date,
      flight_cabin: this.state.flight_cabin,
      flight_seats: this.state.flight_seats,
    };

    axios
      .post("http://localhost:5000/flight/add", newflight)
      .then((res) => console.log(res.data));


    // We will empty the state after posting the data to the database
    this.setState({
      flight_no : "",
      flight_from: "",
      flight_to: "",
      flight_date: "",
      flight_cabin: "",
      flight_seats: "",
    });

    this.props.history.push("/");
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Add New Flight</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Flight Number: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.flight_no}
              onChange={this.onChangeFlightNo}
            />
          </div>
          <div className="form-group">
            <label>From: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.flight_from}
              onChange={this.onChangeFlightFrom}
            />
          </div>
          <div className="form-group">
            <label>To: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.flight_to}
              onChange={this.onChangeFlightTo}
            />
          </div>
          <div className="form-group">
            <label>Flight Date: </label>
            <input
              type="date"
              className="form-control"
              value={this.state.flight_date}
              onChange={this.onChangeFlightDate}
            />
          </div>
          <div className="form-group">
            <label>Cabin: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.flight_cabin}
              onChange={this.onChangeFlightCabin}
            />
          </div>
          <div className="form-group">
            <label>Seats: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.flight_seats}
              onChange={this.onChangeFlightSeats}
            />
          </div>
          
          <div className="form-group">
            <input
              type="submit"
              value="Add flight"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Create);
