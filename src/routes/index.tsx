import React from "react";
import { Route, Router } from "react-router-dom";
import { isAdmin } from "../config/Utils";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Cities from "../containers/Registrations/Cities";
import MinisteriesOrPositions from "../containers/Registrations/MinisteriesOrPositions";
import PrayingHouses from "../containers/Registrations/PrayingHouses";
import Users from "../containers/Registrations/Users";
import Volunteers from "../containers/Registrations/Volunteers";
import VolunteersReport from '../containers/Reports/Volunteers';
import history from "./history";

const Routes = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/cadastros/casas-oracao" component={PrayingHouses} />
      <Route path="/cadastros/voluntarios" component={Volunteers} />
      ({isAdmin() ? <Route path="/cadastros/cidades" component={Cities} /> : ''})
    ({isAdmin() ? <Route path="/cadastros/ministerios-cargos" component={MinisteriesOrPositions} /> : ''})
    ({isAdmin() ? <Route path="/cadastros/usuarios" component={Users} /> : ''})
    <Route path="/relatorios/voluntarios" component={VolunteersReport} />
    </div>
  </Router>
);

export default Routes;
