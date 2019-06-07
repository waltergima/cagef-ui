import { MagaForm, MagaHeader, MagaTable, Tab } from "maga-components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Notifications from "react-notify-toast";
import Main from "../../../components/Main";
import { parseParams } from "../Utils";
import { CitiesStore } from './store';

interface Props {
    CitiesStore: CitiesStore;
}

@inject("CitiesStore")
@observer
export default class Cities extends React.Component<Props> {
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
                            columns={this.props.CitiesStore.columsMasterCities}
                            data={this.props.CitiesStore.listCities}
                            loading={this.props.CitiesStore.loadList}
                            pages={this.props.CitiesStore.pages}
                            defaultPageSize={this.props.CitiesStore.pageSize}
                            tableAction={async (value: any) => {
                                this.props.CitiesStore.pageSize = value.pageSize;
                                await this.props.CitiesStore.getListCities(parseParams(value));
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
                            ref={(ref: any) => (this.props.CitiesStore.form = ref)}
                            title="Adicionar cidade"
                            formTemplate={this.props.CitiesStore.formCreateCity}
                            loading={this.props.CitiesStore.loadForm}
                            onSubmit={async data => {
                                try {
                                    this.props.CitiesStore.saveCity(data);
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
                        title="Cidades"
                        description="Cadastre cidades da nossa região ou do Brasil"
                        icon="wpforms"
                        action={[]}
                    />
                    <Tab
                        panes={panes}
                        renderActiveOnly={false}
                        activeIndex={this.props.CitiesStore.activeTab}
                        onTabChange={this.props.CitiesStore.handleTabChange}
                    />
                </Main>
            </div>
        );
    }
}
