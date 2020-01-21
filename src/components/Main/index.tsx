import { MagaSideBar } from "maga-components";
import * as React from "react";
import Notifications from "react-notify-toast";
import { isAdmin, userData } from '../../config/Utils';
import history from "../../routes/history";
import { SYSTEM } from "./constants";
interface Props {
  children: any;
}

export default class Main extends React.Component<Props> {
  static defaultProps = {
    children: ""
  };
  state = { width: 0 };

  handleOnUpdate = (e: any, { width }: any) => this.setState({ width });

  render() {
    const { children } = this.props;
    return (

      <React.Fragment>
        <MagaSideBar system={SYSTEM}
          activeUser={userData().userName}
          onSelectSideMenu={(route: any) => {
            history.push(`${process.env.PUBLIC_URL}${route}`);
          }}
          onSelectDropDownUserMenu={(item: any) => {
            history.push(`${process.env.PUBLIC_URL}${item.route}`);
          }}
          onSelectMessage={(item: any) => {
            console.log(item);
          }}
          onLogout={() => {
            window.location.href = `${process.env.REACT_APP_PUBLIC_URL}/login`;
          }}
          onSelectLogo={() => {
            window.location.href = `${process.env.REACT_APP_PUBLIC_URL}`;
          }}
          menu={[
            {
              title: "Home",
              icon: "home",
              route: "/"
            },
            {
              title: "Cadastros",
              icon: "wpforms",
              ref: "registration",
              route: "/cadastros",
              subItems: [{
                title: "Casas de Oração",
                ref: "prayingHouses",
                route: "/cadastros/casas-oracao"
              }, {
                title: "Voluntários",
                ref: "volunteers",
                route: "/cadastros/voluntarios"
              }, {
                ...(isAdmin() && {
                  title: "Cidades",
                  ref: "cities",
                  route: "/cadastros/cidades"
                })
              }, {
                ...(isAdmin() && {
                  title: "Ministérios / Cargos",
                  ref: "ministeriesOrPositions",
                  route: "/cadastros/ministerios-cargos"
                })
              }, {
                ...(isAdmin() && {
                  title: "Usuários",
                  ref: "users",
                  route: "/cadastros/usuarios"
                })
              }
              ]
            }, {
              title: "Relatórios",
              icon: "clipboard check",
              ref: "report",
              route: "/relatorios",
              subItems: [{
                title: "Voluntários",
                ref: "reportVolunteers",
                route: "/relatorios/voluntarios"
              }]
            }
          ]}
        >
          {children}
        </MagaSideBar>}
        <Notifications />
      </React.Fragment>
    );
  }
}
