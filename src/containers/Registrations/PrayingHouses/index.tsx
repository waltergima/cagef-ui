import { MagaForm, MagaHeader, MagaTable, Tab } from "maga-components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Notifications from "react-notify-toast";
import Main from "../../../components/Main";
import { parseParams } from "../Utils";
import { PrayingHousesStore } from './store';

interface Props {
    PrayingHousesStore: PrayingHousesStore;
}

@inject("PrayingHousesStore")
@observer
export default class PrayingHouses extends React.Component<Props> {
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
                            columns={this.props.PrayingHousesStore.columsMasterPrayingHouses}
                            data={this.props.PrayingHousesStore.listPrayingHouses}
                            loading={this.props.PrayingHousesStore.loadList}
                            pages={this.props.PrayingHousesStore.pages}
                            defaultPageSize={this.props.PrayingHousesStore.pageSize}
                            getDataList={(data: any) => {
                                alert(JSON.stringify(data));
                            }}
                            tableAction={async (value: any) => {
                                this.props.PrayingHousesStore.pageSize = value.pageSize;
                                await this.props.PrayingHousesStore.getListPrayingHouses(parseParams(value));
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
                            ref={(ref: any) => (this.props.PrayingHousesStore.form = ref)}
                            title="Adicionar casa de oração"
                            formTemplate={this.props.PrayingHousesStore.formCreatePrayingHouse}
                            loading={this.props.PrayingHousesStore.loadForm}
                            onChange={() => { }}
                            accordionStatusOpened={() => { }}
                            onSubmit={async (data: any) => {
                                try {
                                    this.props.PrayingHousesStore.savePrayingHouse(data);
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
                        title="Casa de Oração"
                        description="Cadastre casas de oração da nossa região"
                        icon="wpforms"
                        action={[]}
                    />
                    <Tab
                        panes={panes}
                        renderActiveOnly={false}
                        activeIndex={this.props.PrayingHousesStore.activeTab}
                        onTabChange={this.props.PrayingHousesStore.handleTabChange}
                    />
                </Main>
            </div>
        );
    }
}
