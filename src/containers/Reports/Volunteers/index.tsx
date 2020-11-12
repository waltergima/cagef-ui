import { Chart } from "react-google-charts";
import * as React from "react";
import { observer, inject } from "mobx-react";
import { MagaHeader, MagaForm, Divider } from "maga-components";
import Notifications from "react-notify-toast";
import Main from "../../../components/Main";
import { VolunteersReportStore } from './store';

interface Props {
  VolunteersReportStore: VolunteersReportStore;
}

@inject("VolunteersReportStore")
@observer
export default class VolunteersReport extends React.Component<Props> {
  async componentDidMount() {
    this.props.VolunteersReportStore.loadForm = true;
    await this.props.VolunteersReportStore.mountCitiesSelect();
    await this.props.VolunteersReportStore.mountMinistryOrPositionSelect();
    this.props.VolunteersReportStore.loadForm = false;
  }

  renderCharts() {
    if (this.props.VolunteersReportStore.data.length > 0) {
      let charts: any[] = [];
      for (let i = 1; i < this.props.VolunteersReportStore.data.length; i++) {
        charts.push(
          <Chart
            width={'1000'}
            height={'950px'}
            chartType="Bar"
            loader={<div>Gerando gráfico</div>}
            data={[this.props.VolunteersReportStore.data[0], this.props.VolunteersReportStore.data[i]]}
            options={{
              title: `Ministérios por ${this.props.VolunteersReportStore.data[0][0]}. Total de colaboradores: ${this.props.VolunteersReportStore.totalElements}`,
              isStacked: false,
              chartArea: { width: '60%' },
              hAxis: {
                title: 'Quantidade',
                minValue: 0,
              },
              vAxis: {
                title: `${this.props.VolunteersReportStore.data[0][0]}`,
              },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        );
        charts.push(<Divider />);
      }
      return charts;
    }
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
          <MagaForm
            ref={(ref: any) => (this.props.VolunteersReportStore.form = ref)}
            title="Relatórios"
            formTemplate={this.props.VolunteersReportStore.formTemplate}
            loading={this.props.VolunteersReportStore.loadForm}
            onChange={this.props.VolunteersReportStore.formChangeHandler}
            accordionStatusOpened={() => { }}
            onSubmit={async (data: any) => {
              try {
                this.props.VolunteersReportStore.generateReport(data);
              } catch (error) {
                return error;
              }
            }}
          />
          {this.renderCharts()}
        </Main>
      </div>
    )
  }
}