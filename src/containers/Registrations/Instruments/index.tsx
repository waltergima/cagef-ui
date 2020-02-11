import { MagaForm, MagaHeader, MagaTable, Tab } from "maga-components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Notifications from "react-notify-toast";
import Main from "../../../components/Main";
import { parseParams } from "../Utils";
import { InstrumentsStore } from './store';

interface Props {
    InstrumentsStore: InstrumentsStore;
}

@inject("InstrumentsStore")
@observer
export default class Instruments extends React.Component<Props> {
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
                            columns={this.props.InstrumentsStore.columsMasterInstruments}
                            data={this.props.InstrumentsStore.listInstruments}
                            loading={this.props.InstrumentsStore.loadList}
                            pages={this.props.InstrumentsStore.pages}
                            defaultPageSize={this.props.InstrumentsStore.pageSize}
                            tableAction={async (value: any) => {
                                this.props.InstrumentsStore.pageSize = value.pageSize;
                                await this.props.InstrumentsStore.getListInstruments(parseParams(value));
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
                            ref={(ref: any) => (this.props.InstrumentsStore.form = ref)}
                            title="Adicionar instrumento"
                            formTemplate={this.props.InstrumentsStore.formCreateInstrument}
                            loading={this.props.InstrumentsStore.loadForm}
                            onChange={() => { }}
                            accordionStatusOpened={() => { }}
                            onSubmit={async (data: any) => {
                                try {
                                    this.props.InstrumentsStore.saveInstrument(data);
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
                        description="Cadastre instrumentos"
                        icon="wpforms"
                        action={[]}
                    />
                    <Tab
                        panes={panes}
                        renderActiveOnly={false}
                        activeIndex={this.props.InstrumentsStore.activeTab}
                        onTabChange={this.props.InstrumentsStore.handleTabChange}
                    />
                </Main>
            </div>
        );
    }
}
