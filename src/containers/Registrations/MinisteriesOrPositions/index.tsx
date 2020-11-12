import { Button, MagaForm, MagaHeader, MagaTable, Modal, Tab } from "maga-components";
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
                            accordionStatusOpened={() => { }}
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
                <Modal open={this.props.MinisteriesOrPositionsStore.isModalDelete} size="mini">
                  <>
                    <Modal.Header>Alerta</Modal.Header>
                    <Modal.Content>
                      <p>
                        Tem certeza que deseja remover o ministério / cargo?
                        <br />
                        <b>Esta ação não poderá ser desfeita</b>
                      </p>

                    </Modal.Content>
                  </>
                  <Modal.Actions>
                    <>
                      <Button onClick={() => this.props.MinisteriesOrPositionsStore.isModalDelete = false}>
                        Cancelar
                      </Button>
                              <Button
                                color="red"
                                onClick={async () =>
                                  await this.props.MinisteriesOrPositionsStore.removeMinistryOrPosition()
                                }
                              >
                                Continuar
                      </Button>
                    </>
                  </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
