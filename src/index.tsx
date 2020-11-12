import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import LoginStore from "./containers/Login/store";
import InstrumentsStore from "./containers/Registrations/Instruments/store";
import CitiesStore from "./containers/Registrations/Cities/store";
import MinisteriesOrPositionsStore from "./containers/Registrations/MinisteriesOrPositions/store";
import MusiciansStore from "./containers/Registrations/Musicians/store";
import PrayingHousesStore from "./containers/Registrations/PrayingHouses/store";
import UsersStore from "./containers/Registrations/Users/store";
import VolunteersStore from "./containers/Registrations/Volunteers/store";
import VolunteersReportStore from "./containers/Reports/Volunteers/store";
import "./index.css";
import Routes from "./routes";
import * as serviceWorker from "./serviceWorker";


const stores = {
  CitiesStore,
  InstrumentsStore,
  LoginStore,
  MinisteriesOrPositionsStore,
  MusiciansStore,
  PrayingHousesStore,
  UsersStore,
  VolunteersStore,
  VolunteersReportStore,
};

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

