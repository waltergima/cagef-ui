import { MagaForm, MagaHeader, MagaTable, Tab } from "maga-components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Notifications from "react-notify-toast";
import Main from "../../../components/Main";
import { parseParams } from "../Utils";
import { UsersStore } from './store';

interface Props {
    UsersStore: UsersStore;
}

@inject("UsersStore")
@observer
export default class Users extends React.Component<Props> {
    render() {
        const panes = [
            {
                menuItem: "Listagem",
                pane: {
                    key: 1,
                    active: true,
                    content: (
                        <MagaTable
                            filterable={true}
                            serverSide={true}
                            columns={this.props.UsersStore.columsMasterUsers}
                            data={this.props.UsersStore.listUsers}
                            loading={this.props.UsersStore.loadList}
                            pages={this.props.UsersStore.pages}
                            defaultPageSize={this.props.UsersStore.pageSize}
                            tableAction={async (value: any) => {
                                this.props.UsersStore.pageSize = value.pageSize;
                                await this.props.UsersStore.getListUsers(parseParams(value));
                            }}
                        />
                    )
                }
            },
            {
                menuItem: "Cadastro",
                pane: {
                    key: 2,
                    content: (
                        <MagaForm
                            ref={(ref: any) => (this.props.UsersStore.form = ref)}
                            title="Adicionar usuário"
                            formTemplate={this.props.UsersStore.formCreateUser}
                            loading={this.props.UsersStore.loadForm}
                            onChange={() => { }}
                            accordionStatusOpened={() => { }}
                            onSubmit={async (data: any) => {
                                try {
                                    this.props.UsersStore.saveUser(data);
                                } catch (error) {
                                    return error;
                                }
                            }}
                        />
                    )
                }
            }
        ];

        return (
            <div>
                <Notifications />
                <Main>
                    <MagaHeader
                        title="Usuários"
                        description="Cadastre usuários com diferentes permissões para acessar o sistema"
                        icon="wpforms"
                        action={[]}
                    />
                    <Tab
                        panes={panes}
                        renderActiveOnly={false}
                        activeIndex={this.props.UsersStore.activeTab}
                        onTabChange={this.props.UsersStore.handleTabChange}
                    />
                </Main>
            </div>
        );
    }
}
