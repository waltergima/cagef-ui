import * as React from "react";
import { MagaHeader, MagaMenuCards } from "maga-components";
import Main from "../../components/Main";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { menuItens } from './constants';
interface Props extends RouteComponentProps<any> { }

class Home extends React.Component<Props> {
  render() {
    return (
      <Main>
        <MagaHeader
          title="CAGEF"
          description="Cadastro Geral de Funções"
          icon="window maximize outline"
        />
        <MagaMenuCards blockMenu={menuItens} />
      </Main>
    );
  }
}

export default withRouter<Props>(Home);
