import { Container, Divider, Grid, Header, Image, MagaForm, Segment } from "maga-components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Notifications from "react-notify-toast";
import { LoginStore } from './store';
import { notify } from "react-notify-toast";
import { colorMessage } from "../../config/Const";
import LogoSystem from "../../assets/images/Logoccb.png";

interface Props {
    LoginStore: LoginStore;
}

@inject("LoginStore")
@observer
export default class Login extends React.Component<Props> {
    componentDidMount() {
        const props: any = this.props;
        if (props.location.search.includes('expired=true')) {
            notify.show(
                `Sessão expirada. Por favor realize o login novamente`,
                "custom",
                10000,
                colorMessage.info,
            );
        }
    }

    render() {
        return (
            <div className="login">
                <Container text style={{ marginTop: "12em" }}>
                    <Segment inverted raised color="blue" className="login-block">
                        <Grid columns={1} divided textAlign={"center"}>
                            <Grid.Column className="login-block login-block-form-field">
                                <Notifications />
                                <Grid.Row>
                                    <Divider hidden />
                                    <Image avatar={false} src={LogoSystem} size="medium" centered />
                                    <Header as="h2" color="blue" >
                                        CAGEF - Cadastro Geral de Funções
                                    </Header>
                                    <Divider hidden />
                                    <Grid.Row>
                                        <MagaForm
                                            accordion={false}
                                            ref={(ref: any) => (this.props.LoginStore.form = ref)}
                                            title="Login"
                                            formTemplate={this.props.LoginStore.formLogin}
                                            loading={this.props.LoginStore.loadForm}
                                            onChange={() => { }}
                                            accordionStatusOpened={() => { }}
                                            onSubmit={async (data: any) => {
                                                try {
                                                    this.props.LoginStore.login(data);
                                                } catch (error) {
                                                    return error;
                                                }
                                            }}
                                        />
                                    </Grid.Row>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Container>
            </div>
        );
    }
}