import * as React from "react";
import { MagaNav, Divider, Grid, Responsive, MagaSideBar } from "maga-components";
import { userData, isAdmin } from '../../config/Utils';
import { SYSTEM } from "./constants";
import history from "../../routes/history";
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
    const { width } = this.state;
    return (
      <Responsive fireOnMount onUpdate={this.handleOnUpdate}>
        <div className="page">
          <Grid>
            <Grid.Column color="blue" width={width > 1700 ? 2 : 3}>
              <MagaSideBar system={SYSTEM}
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
                window.location.href = `${process.env.REACT_APP_PUBLIC_URL}`;
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
                    name: "Cadastros",
                    icon: "wpforms",
                    ref: "registration",
                    route: "/cadastros",
                    subItens: [{
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
                  }
                ]}
              />
            </Grid.Column>
            <Grid.Column
              width={width > 1700 ? 14 : 13}
              style={{ paddingLeft: 0 }}
            >
              <MagaNav
                logo="magalog"
                urlExit="/login"
                urlLogo="/"
                userName={userData().userName}
                fluid
                menu={[]}
              />
              <div>
              </div>
              <Grid padded>
                <Grid.Column width={16}>
                  <Divider hidden />
                  {children}
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </div>
      </Responsive>
    );
  }
}
