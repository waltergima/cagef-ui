import { MagaForm, MagaHeader, MagaTable, Tab } from "maga-components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Notifications from "react-notify-toast";
import Main from "../../../components/Main";
import { parseParams } from "../Utils";
import { VolunteersStore } from "./store";

interface Props {
    VolunteersStore: VolunteersStore;
}

@inject("VolunteersStore")
@observer
export default class Volunteers extends React.Component<Props> {
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
                            columns={this.props.VolunteersStore.columsMasterVolunteers}
                            data={this.props.VolunteersStore.listVolunteers}
                            loading={this.props.VolunteersStore.loadList}
                            pages={this.props.VolunteersStore.pages}
                            defaultPageSize={this.props.VolunteersStore.pageSize}
                            tableAction={async (value: any) => {
                                this.props.VolunteersStore.pageSize = value.pageSize;
                                await this.props.VolunteersStore.getListVolunteers(parseParams(value));
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
                            ref={(ref: any) => (this.props.VolunteersStore.form = ref)}
                            title="Adicionar voluntário"
                            formTemplate={this.props.VolunteersStore.formCreateVolunteer}
                            loading={this.props.VolunteersStore.loadForm}
                            onChange={this.props.VolunteersStore.formChangeHandler}
                            onSubmit={async (data: any) => {
                                try {
                                    this.props.VolunteersStore.saveVolunteer(data);
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
                        title="Voluntários"
                        description="Cadastre voluntários da nossa região"
                        icon="wpforms"
                        action={[]}
                    />
                    <Tab
                        panes={panes}
                        renderActiveOnly={false}
                        activeIndex={this.props.VolunteersStore.activeTab}
                        onTabChange={this.props.VolunteersStore.handleTabChange}
                    />
                </Main>
            </div>
        );
    }
}
