import React from "react";
import { Route, Switch } from "react-router-dom";
import { isAdmin } from "../config/Utils";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Cities from "../containers/Registrations/Cities";
import MinisteriesOrPositions from "../containers/Registrations/MinisteriesOrPositions";
import PrayingHouses from "../containers/Registrations/PrayingHouses";
import Users from "../containers/Registrations/Users";
import Volunteers from "../containers/Registrations/Volunteers";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default Routes;
