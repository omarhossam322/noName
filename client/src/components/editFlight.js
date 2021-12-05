import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";

class Edit extends Component {
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
      flights: [],
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/flight/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          flight_no: response.data.flight_no,
          flight_from: response.data.flight_from,
          flight_to: response.data.flight_to,
          flight_date: response.data.flight_date,
          flight_cabin: response.data.flight_cabin,
          flight_seats: response.data.flight_seats,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
    const newEditedflight = {
      flight_no: this.state.flight_no,
      flight_from: this.state.flight_from,
      flight_to: this.state.flight_to,
      flight_date: this.state.flight_date,
      flight_cabin: this.state.flight_cabin,
      flight_seats: this.state.flight_seats,
    };
    console.log(newEditedflight);

    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/updateFlight/" + this.props.match.params.id,
        newEditedflight
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
        <h3 align="center">Update Flight</h3>
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
          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Flight"
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
