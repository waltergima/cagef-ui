import { Chart } from "react-google-charts";
import * as React from "react";
import { observer, inject } from "mobx-react";
import { MagaHeader, Dropdown, Button } from "maga-components";
import Notifications from "react-notify-toast";
import Main from "../../../components/Main";
import { VolunteersReportStore } from "./store";
const Picky = require("react-picky");

interface Props {
    VolunteersReportStore: VolunteersReportStore
}

const options = [
    { key: '1', text: 'Casa Branca', value: 1 },
    { key: '2', text: 'Mococa', value: 2 },
    { key: '3', text: 'Leme', value: 3 }
];

@inject("VolunteersReportStore")
@observer
export default class VolunteersReport extends React.Component<Props> {
    async componentDidMount() {
        await this.props.VolunteersReportStore.mountCityAndVolunteerSelects();
        // await this.props.VolunteersReportStore.getReportData();
    }
    render() {
        return (
            <div>
                <Notifications />
                <Main>
                    <MagaHeader
                        title="Relatórios"
                        description="Relatório de voluntários por cidade e ministério / cargo"
                        icon="wpforms"
                        action={[]}
                    />
                    {/* <Dropdown
                        placeholder="Cidades"
                        selection
                        multiple
                        search={false}
                        width={8}
                        options={this.props.VolunteersReportStore.cities}
                        onChange={(e, itemInput) => {
                            if ('Todas' != itemInput.value)
                                this.props.VolunteersReportStore.cityIds = itemInput.value
                        }}
                    />

                    <Dropdown
                        placeholder="Ministérios / Cargos"
                        selectedLabel="Todos"
                        selection
                        multiple
                        search={false}
                        width={8}
                        options={this.props.VolunteersReportStore.ministeriesOrPositions}
                        onChange={(e, itemInput) => this.props.VolunteersReportStore.ministeriesOrPositionsIds = itemInput.value
                        }
                    /> */}

                    <Picky
                        id={"citiesPicky"}
                        className="report-picky"
                        onChange={(itemInput: any) => this.props.VolunteersReportStore.handleChangeCitiesMultSelect(itemInput)}
                        value={this.props.VolunteersReportStore.selectedCities}
                        valueKey="value"
                        labelKey="text"
                        multiple={true}
                        includeSelectAll={true}
                        includeFilter={true}
                        dropdownHeight={250}
                        options={this.props.VolunteersReportStore.cities}
                        open={false}
                        selectAllText={"Selecionar todas"}
                        placeholder={"Cidades"}
                        tabIndex={0}
                        filterPlaceholder="Filtrar"
                        manySelectedPlaceholder={"%s selecionadas"}
                        allSelectedPlaceholder={"%s selecionadas"}
                    />

                    <Picky
                        id={"ministryOrPositionPicky"}
                        className="report-picky"
                        onChange={(itemInput: any) => this.props.VolunteersReportStore.handleChangeMinisteriesMultSelect(itemInput)}
                        value={this.props.VolunteersReportStore.selectedMinisteries}
                        valueKey="value"
                        labelKey="text"
                        multiple={true}
                        includeSelectAll={true}
                        includeFilter={true}
                        dropdownHeight={250}
                        options={this.props.VolunteersReportStore.ministeriesOrPositions}
                        open={false}
                        selectAllText={"Selecionar todos"}
                        placeholder={"Ministérios / Cargos"}
                        tabIndex={1}
                        filterPlaceholder="Filtrar"
                        manySelectedPlaceholder={"%s selecionados"}
                        allSelectedPlaceholder={"%s selecionados"}
                    />
                    <Button
                        icon="search"
                        onClick={async () => {
                            await this.props.VolunteersReportStore.getReportData()
                        }}
                    />

                    <Button
                        icon="search"
                        onClick={() => {
                            this.props.VolunteersReportStore.exportToPdf()
                        }}
                    />

                    {this.props.VolunteersReportStore.reportData.length > 0 &&
                        <Chart
                            width={'100%'}
                            height={'600px'}
                            chartType="ComboChart"
                            loader={<div>Carregando gráfico</div>}
                            data={this.props.VolunteersReportStore.reportData}
                            options={{
                                chart: {
                                    title: 'Voluntários',
                                    subtitle: 'por cidade e ministério / cargo',
                                },
                                vAxis: { title: 'Ministérios' },
                                hAxis: { title: 'Cidades' },
                                seriesType: 'bars',
                            }} />}

                </Main>
            </div>
        )
    }
}