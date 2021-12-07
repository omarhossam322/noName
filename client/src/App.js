import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import NavbarUser from "./components/navbarUser";
import EditFlight from "./components/editFlight";
import EditUser from "./components/editUser";
import CreateFlight from "./components/createFlight";
import FlightList from "./components/flightList";
import FlightListUsers from "./components/flightListUsers";
import FlightListUsersReturn from "./components/flightListUsersReturn";
import ReservationList from "./components/reservationsList";

const App = () => {
  return (
    <div>
      
      <Route exact path="/">
        <Navbar />
        <FlightList />
      </Route>

      <Route exact path="/userHome">
        <NavbarUser />
        <FlightListUsers />
      </Route>

      <Route exact path="/reservations">
        <NavbarUser />
        <ReservationList />
      </Route>

      <Route exact path="/userDetails">
        <NavbarUser />
        <EditUser />
      </Route>

      <Route path="/returnFlight/:flight_to/:flight_no" component={FlightListUsersReturn}>
      </Route>
      <Route path="/editFlight/:id" component={EditFlight} />
      <Route path="/createFlight">
        <CreateFlight />
      </Route>
    </div>
  );
};

export default App;
