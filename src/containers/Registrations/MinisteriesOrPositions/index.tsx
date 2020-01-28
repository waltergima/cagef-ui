import { MagaForm, MagaHeader, MagaTable, Tab } from "maga-components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Notifications from "react-notify-toast";
import Main from "../../../components/Main";
import { parseParams } from "../Utils";
import { MinisteriesOrPositionsStore } from './store';

interface Props {
    MinisteriesOrPositionsStore: MinisteriesOrPositionsStore;
}

@inject("MinisteriesOrPositionsStore")
@observer
export default class MinisteriesOrPositions extends React.Component<Props> {
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
                            columns={this.props.MinisteriesOrPositionsStore.columsMasterMinisteriesOrPositions}
                            data={this.props.MinisteriesOrPositionsStore.listMinisteriesOrPositions}
                            loading={this.props.MinisteriesOrPositionsStore.loadList}
                            pages={this.props.MinisteriesOrPositionsStore.pages}
                            defaultPageSize={this.props.MinisteriesOrPositionsStore.pageSize}
                            tableAction={async (value: any) => {
                                this.props.MinisteriesOrPositionsStore.pageSize = value.pageSize;
                                await this.props.MinisteriesOrPositionsStore.getListMinisteriesOrPositions(parseParams(value));
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
                            ref={(ref: any) => (this.props.MinisteriesOrPositionsStore.form = ref)}
                            title="Adicionar ministério / cargo"
                            formTemplate={this.props.MinisteriesOrPositionsStore.formCreateMinistryOrPosition}
                            loading={this.props.MinisteriesOrPositionsStore.loadForm}
                            onChange={() => { }}
                            onSubmit={async (data: any) => {
                                try {
                                    this.props.MinisteriesOrPositionsStore.saveMinistryOrPosition(data);
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
                        title="Ministérios / Cargos"
                        description="Cadastre ministérios / cargos"
                        icon="wpforms"
                        action={[]}
                    />
                    <Tab
                        panes={panes}
                        renderActiveOnly={false}
                        activeIndex={this.props.MinisteriesOrPositionsStore.activeTab}
                        onTabChange={this.props.MinisteriesOrPositionsStore.handleTabChange}
                    />
                </Main>
            </div>
        );
    }
}
