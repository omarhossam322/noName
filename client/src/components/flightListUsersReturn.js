import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const Flight = (props) => (
  <tr>
    <td>{props.flight.flight_no}</td>
    <td>{props.flight.flight_from}</td>
    <td>{props.flight.flight_to}</td>
    <td>{props.flight.flight_date}</td>
    <td>{props.flight.flight_cabin}</td>
    <td>{props.flight.flight_seats}</td>
    <td>
      <a
        href="/userHome"
        onClick={() => {
          //popup
          const confirmBox = window.confirm(
            "Do you want to confirm reservation?"
          )
          if (confirmBox === true) {
            props.reserve(props.flight.flight_no);
          }else{
            return false;
          }
        }}
      >
        Select Return flight
      </a>
    </td>
  </tr>
);

export default class FlightList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.reserve = this.reserve.bind(this);
    this.state = { flights: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/reserve/" + this.props.match.params.flight_to)
      .then((response) => {
        this.setState({ flights: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  reserve(id) {
    const newReservation = {
      user: "user1",
      dep_flight_no: this.props.match.params.flight_no,
      return_flight_no: id,
    };
    axios.post("http://localhost:5000/reserve/add", newReservation).then((response) => {
      console.log(response.data);
    });
  }

  // This method will map out the flights on the table
  flightList() {
    return this.state.flights.map((currentflight) => {
      return (
        <Flight
          flight={currentflight}
          reserve={this.reserve}
          key={currentflight._id}
        />
      );
    });
  }

  // This following section will display the table with the flights.
  render() {
    return (
      <div>
        <h3>Return Flight List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>From</th>
              <th>To</th>
              <th>Flight Date</th>
              <th>Cabin</th>
              <th>Seats Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.flightList()}</tbody>
        </table>
      </div>

    );
  }
}
