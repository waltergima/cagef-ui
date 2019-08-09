import { Chart } from "react-google-charts";
import * as React from "react";
import { observer } from "mobx-react";
import { MagaHeader } from "maga-components";
import Notifications from "react-notify-toast";
import Main from "../../../components/Main";

interface Props {
}

@observer
export default class VolunteersReport extends React.Component<Props> {
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
                    <Chart
                        width={'700px'}
                        height={'400px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Cidade', 'Diácono', 'Ancião', 'Cooperador'],
                            ['Mococa', 20, 25, 12],
                            ['Casa Branca', 2, 1, 1],
                            ['Itobi', 150, 125, 30],
                            ['Porto Ferreira', 5, 6, 2],
                        ]}
                        options={{
                            // Material design options
                            chart: {
                                title: 'Voluntários',
                                subtitle: 'por cidade e ministério / cargo',
                            },
                        }} />
                </Main>
            </div>
        )
    }
}