import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import NavbarUser from "./components/navbarUser";
import NavbarGuest from "./components/navbarGuest";
import EditFlight from "./components/editFlight";
import EditUser from "./components/editUser";
import CreateFlight from "./components/createFlight";
import Login from "./components/login";
import Signup from "./components/signup";
import FlightList from "./components/flightList";
import FlightListUsers from "./components/flightListUsers";
import FlightListUsersReturn from "./components/flightListUsersReturn";
import ReservationList from "./components/reservationsList";
import ChangePass from "./components/changePass";

const App = () => {
  return (
    <div>
      <Route exact path="/">
        <NavbarGuest />
        <FlightListUsers />
      </Route>

      <Route exact path="/notadmin">
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

      <Route path="/returnFlight/:flight_to/:flight_no" component={FlightListUsersReturn} />

      <Route path="/editFlight/:id" component={EditFlight} />

      <Route path="/createFlight">
        <Navbar />
        <CreateFlight />
      </Route>

      <Route path="/login">
        <NavbarGuest />
        <Login />
      </Route>

      <Route path="/signup">
        <NavbarGuest />
        <Signup />
      </Route>

      <Route path="/changePassword">
        <NavbarUser />
        <ChangePass />
      </Route>
    </div>
  );
};

export default App;
