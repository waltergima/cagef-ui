import * as React from "react";
import { MagaNav, Divider, Grid, Responsive, MagaMenu } from "maga-components";
import { userData, isAdmin } from '../../config/Utils';
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
              <MagaMenu name="CAGEF" logo="" version="1.0.0"
                menu={[
                  {
                    name: "Home",
                    icon: "home",
                    ref: "home",
                    route: "/",
                    active: true
                  },
                  {
                    name: "Cadastros",
                    icon: "wpforms",
                    ref: "registration",
                    route: "/cadastros",
                    subItens: [{
                      name: "Casas de Oração",
                      ref: "prayingHouses",
                      route: "/cadastros/casas-oracao"
                    }, {
                      name: "Voluntários",
                      ref: "volunteers",
                      route: "/cadastros/voluntarios"
                    }, {
                      ...(isAdmin() && {
                        name: "Cidades",
                        ref: "cities",
                        route: "/cadastros/cidades"
                      })
                    }, {
                      ...(isAdmin() && {
                        name: "Ministérios / Cargos",
                        ref: "ministeriesOrPositions",
                        route: "/cadastros/ministerios-cargos"
                      })
                    }, {
                      ...(isAdmin() && {
                        name: "Usuários",
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
