import { MagaSideBar } from "maga-components";
import * as React from "react";
import Notifications from "react-notify-toast";
import { hasRole, userData } from '../../config/Utils';
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
                ...(hasRole() && {
                  title: "Cidades",
                  ref: "cities",
                  route: "/cadastros/cidades"
                })
              }, {
                ...(hasRole() && {
                  title: "Ministérios / Cargos",
                  ref: "ministeriesOrPositions",
                  route: "/cadastros/ministerios-cargos"
                })
              }, {
                ...(hasRole() && {
                  title: "Usuários",
                  ref: "users",
                  route: "/cadastros/usuarios"
                })
              }
              ]
            }, {
              ...(!hasRole("ROLE_USUARIO") && {
                title: "Gestão Musical",
                icon: "music",
                ref: "music",
                route: "/cadastros/musicos",
                subItems: [{
                  title: "Músicos",
                  ref: "musicians",
                  route: "/cadastros/musicos"
                }, {
                  ...((hasRole("ROLE_ADMIN") || hasRole("ROLE_ADMIN_MUSICA")) && {
                    title: "Instrumentos",
                    ref: "instruments",
                    route: "/cadastros/instrumentos"
                  })
                }]
              })
            }
          ]}
        >
          {children}
        </MagaSideBar>}
        <Notifications />
      </React.Fragment >
    );
  }
}
