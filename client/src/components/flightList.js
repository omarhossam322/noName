import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
//import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'

const Flight = (props) => (
  <tr>
    <td>{props.flight.flight_no}</td>
    <td>{props.flight.flight_from}</td>
    <td>{props.flight.flight_to}</td>
    <td>{props.flight.flight_time}</td>
    <td>{props.flight.flight_date}</td>
    <td>{props.flight.flight_arrival_time}</td>
    <td>{props.flight.flight_arrival_date}</td>
    <td>{props.flight.flight_duration}</td>
    <td>{props.flight.flight_cabin}</td>
    <td>{props.flight.flight_baggage}</td>
    <td>{props.flight.flight_seats}</td>
    <td>{props.flight.flight_price}</td>
    <td>
      <Link to={"/editFlight/" + props.flight._id}>Edit</Link> |
      <a
        href="/"
        onClick={() => {
          //popup
          const confirmBox = window.confirm(
            "Do you really want to delete this Flight?"
          )
          if (confirmBox === true) {
            props.deleteFlight(props.flight._id);
          }
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class FlightList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteFlight = this.deleteFlight.bind(this);
    this.state = { flights: []};
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/flight/")
      .then((response) => {
        this.setState({ flights: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a flight based on the method
  deleteFlight(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      flight: this.state.flights.filter((el) => el._id !== id),
    });
  }

  // This method will map out the flights on the table
  flightList() {
    return this.state.flights.map((currentflight) => {
      return (
        <Flight
          flight={currentflight}
          deleteFlight={this.deleteFlight}
          key={currentflight._id}
        />
      );
    });
  }

  // This following section will display the table with the flights.
  render() {
    return (
      <div>
        <h3>Flight List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>From</th>
              <th>To</th>
              <th>Departure Time</th>
              <th>Departure Date</th>
              <th>Arrival Time</th>
              <th>Arrival Date</th>
              <th>Trip duration</th>
              <th>Cabin</th>
              <th>Baggage allowed</th>
              <th>Seats Available</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.flightList()}</tbody>
        </table>
      </div>

    );
  }
}
