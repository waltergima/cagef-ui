import * as React from "react";
import { MagaHeader, MagaMenuCards } from "maga-components";
import Main from "../../components/Main";
import { RouteComponentProps } from "react-router-dom";
import { menuItens } from './constants';
import history from "../../routes/history";
interface Props extends RouteComponentProps<any> { }

export default class Home extends React.Component<Props> {
  render() {
    return (
      <Main>
        <MagaHeader
          title="CAGEF"
          description="Cadastro Geral de Funções"
          icon="window maximize outline"
        />
        <MagaMenuCards blockMenu={menuItens}
          onSelectItem={(route: any) => {
            history.push(`${process.env.PUBLIC_URL}${route}`);
          }} />
      </Main>
    );
  }
}