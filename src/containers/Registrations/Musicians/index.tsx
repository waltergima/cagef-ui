import { Button, MagaForm, MagaHeader, MagaTable, Modal, Tab } from "maga-components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Notifications from "react-notify-toast";
import Main from "../../../components/Main";
import { parseParams } from "../Utils";
import { MusiciansStore } from "./store";

interface Props {
    MusiciansStore: MusiciansStore;
}

@inject("MusiciansStore")
@observer
export default class Musicians extends React.Component<Props> {
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
                            columns={this.props.MusiciansStore.columsMasterMusicians}
                            data={this.props.MusiciansStore.listMusicians}
                            loading={this.props.MusiciansStore.loadList}
                            pages={this.props.MusiciansStore.pages}
                            defaultPageSize={this.props.MusiciansStore.pageSize}
                            tableAction={async (value: any) => {
                                this.props.MusiciansStore.pageSize = value.pageSize;
                                await this.props.MusiciansStore.getListMusicians(parseParams(value));
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
                            ref={(ref: any) => (this.props.MusiciansStore.form = ref)}
                            title="Adicionar músico"
                            refForm="musicianForm"
                            formTemplate={this.props.MusiciansStore.formCreateMusician}
                            loading={this.props.MusiciansStore.loadForm}
                            onChange={this.props.MusiciansStore.formChangeHandler}
                            accordionStatusOpened={() => { }}
                            onSubmit={async (data: any) => {
                                try {
                                    await this.props.MusiciansStore.saveMusician(data);
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
                        title="Músicos"
                        description="Cadastre músicos da nossa região"
                        icon="wpforms"
                        action={[]}
                    />
                    <Tab
                        panes={panes}
                        renderActiveOnly={false}
                        activeIndex={this.props.MusiciansStore.activeTab}
                        onTabChange={this.props.MusiciansStore.handleTabChange}
                    />
                </Main>
                <Modal open={this.props.MusiciansStore.isModalDelete} size="mini">
                  <>
                    <Modal.Header>Alerta</Modal.Header>
                    <Modal.Content>
                      <p>
                        Tem certeza que deseja remover o músico?
                        <br />
                        <b>Esta ação não poderá ser desfeita</b>
                      </p>

                    </Modal.Content>
                  </>
                  <Modal.Actions>
                    <>
                      <Button onClick={() => this.props.MusiciansStore.isModalDelete = false}>
                        Cancelar
                      </Button>
                              <Button
                                color="red"
                                onClick={async () =>
                                  await this.props.MusiciansStore.removeMusician()
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
