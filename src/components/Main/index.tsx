import { MagaSideBar } from "maga-components";
import * as React from "react";
import Notifications from "react-notify-toast";
import { hasRole, userData, isCagef, isAdmin } from '../../config/Utils';
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
    const menu: any[] = [
      {
        title: "Home",
        icon: "home",
        route: "/"
      }];
    if (!hasRole("ROLE_USUARIO_MUSICA")) {
      menu.push({
        title: "Cadastros",
        icon: "wpforms",
        ref: "registration",
        route: "/cadastros",
        subItems: [{
          ...(isCagef() && {
            title: "Casas de Oração",
            ref: "prayingHouses",
            route: "/cadastros/casas-oracao"
          })
        }, {
          ...(isCagef() && {
            title: "Voluntários",
            ref: "volunteers",
            route: "/cadastros/voluntarios"
          })
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
          ...(isAdmin() && {
            title: "Usuários",
            ref: "users",
            route: "/cadastros/usuarios"
          })
        }
        ]
      });
    }

    if (!hasRole("ROLE_USUARIO")) {
      menu.push({
        title: "Gestão Musical",
        icon: "music",
        ref: "music",
        route: "/cadastros/musicos",
        subItems: [{
          title: "Músicos",
          ref: "musicians",
          route: "/cadastros/musicos"
        }, {
          ...(isAdmin() && {
            title: "Instrumentos",
            ref: "instruments",
            route: "/cadastros/instrumentos"
          })
        }]
      });
    }
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
          menu={menu}
        >
          {children}
        </MagaSideBar>}
        <Notifications />
      </React.Fragment >
    );
  }
}
