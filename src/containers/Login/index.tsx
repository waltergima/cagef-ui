import { Container, Divider, Grid, Header, MagaForm, Segment } from "maga-components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Notifications from "react-notify-toast";
import { LoginStore } from './store';

interface Props {
    LoginStore: LoginStore;
}

@inject("LoginStore")
@observer
export default class Login extends React.Component<Props> {
    render() {
        return (
            <div className="login">
                <Container text style={{ marginTop: "12em" }}>
                    <Segment inverted raised color="blue" className="login-block">
                        <Grid columns={1} divided>
                            <Grid.Column className="login-block login-block-form-field">
                                <Notifications />
                                <Grid.Row>
                                    <Divider hidden />
                                    <Header as="h2" color="blue">
                                        CAGEF - Cadastro Geral de Funções
                                </Header>
                                    <Divider hidden />
                                    <MagaForm
                                        ref={(ref: any) => (this.props.LoginStore.form = ref)}
                                        title="Login"
                                        formTemplate={this.props.LoginStore.formLogin}
                                        loading={this.props.LoginStore.loadForm}
                                        onSubmit={async (data: any) => {
                                            try {
                                                this.props.LoginStore.login(data);
                                            } catch (error) {
                                                return error;
                                            }
                                        }}
                                    />
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Container>
            </div>
        );
    }
}