import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const Reservation = (props) => (
  <tr>
    <td>{props.reservation.dep_flight_no}</td>
    <td>{props.reservation.return_flight_no}</td>
    
    <td>
      <a
        href="/reservations"
        onClick={() => {
          //popup
          const confirmBox = window.confirm(
            "Do you really want to cancel this reservation?"
          )
          if (confirmBox === true) {
            props.deleteReservation(props.reservation._id);
          }
        }}
      >
        Cancel
      </a>
    </td>
  </tr>
);

export default class ReservationList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteReservation = this.deleteReservation.bind(this);
    this.state = { reservations: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/reservations/" + "user1")
      .then((response) => {
        this.setState({ reservations: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a reservation based on the method
  deleteReservation(id) {
    axios.delete("http://localhost:5000/reservations/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      reservation: this.state.reservations.filter((el) => el._id !== id),
    });
  }

  // This method will map out the reservations on the table
  reservationList() {
    return this.state.reservations.map((currentreservation) => {
      return (
        <Reservation
          reservation={currentreservation}
          deleteReservation={this.deleteReservation}
          key={currentreservation._id}
        />
      );
    });
  }

  // This following section will display the table with the reservations.
  render() {
    return (
      <div>
        <h3>Reservation List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Departure Flight Number</th>
              <th>Arrival Flight Number</th>
              
            </tr>
          </thead>
          <tbody>{this.reservationList()}</tbody>
        </table>
      </div>

    );
  }
}
