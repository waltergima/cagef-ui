import { Button, Popup } from "maga-components";
import { action, computed, observable } from "mobx";
import * as React from "react";
import { notify } from "react-notify-toast";
import { colorMessage } from "../../../../config/Const";
import { showErrorMessage } from "../../../../config/Messages";
import { SelectItem } from "../../types";
import { ORIGINAL_FORM_TEMPLATE } from '../constants';
import { create, findAll, remove, update } from '../services';
import { MinistryOrPosition } from "../types";

export class MinisteriesOrPositionsStore {
  @observable offset: number = 0;
  @observable limit: number = 10;
  @observable branch: number = 0;
  @observable tabIndex: number = 0;
  @observable pages: number = 0;
  @observable pageSize: number = 10;
  @observable loadList: boolean = false;
  @observable loadForm: boolean = false;
  @observable listMinisteriesOrPositions: MinistryOrPosition[] = [];
  @observable actionType: string = "";
  @observable formState: any = {};
  @observable form: any = {};
  @observable unselectedMinisteriesOrPositions: SelectItem[] = [];
  @observable ministeriesOrPositions: MinistryOrPosition[] = [];
  @observable id: number = -1;
  @observable isModalDelete = false;
  @observable formTemplate: any = ORIGINAL_FORM_TEMPLATE;
  @observable
  columsMaster: any[] = [
    {
      Header: "",
      accessor: "action",
      maxWidth: 100,
      filterable: false,
      Cell: (row: any) => (
        <Button.Group basic size="medium">
          <Popup
            trigger={
              <Button
                icon="edit"
                onClick={() => {
                  this.prepareEditMinistryOrPosition(this, 1, row.original)
                }}
              />
            }
            content="Editar registro"
            inverted
            position="left center"
          />
          <Popup
            trigger={
              <Button
                icon="trash"
                onClick={() => {
                  this.prepareRemoveMinistryOrPosition(this, row.original);
                }}
              />
            }
            content="Remover registro"
            inverted
            position="top center"
          />
        </Button.Group>
      )
    },
    {
      Header: "ID",
      accessor: "id"
    },
    {
      Header: "Descrição",
      accessor: "description"
    }
  ];

  @action
  handleTabChange = (e: any, tabIndex: any) => {
    if (tabIndex.activeIndex === 1) {
      this.form.resetForm();
      this.prepareCreateMinistryOrPosition(this);
    }
    this.tabIndex = tabIndex.activeIndex;
  };

  @action
  async getListMinisteriesOrPositions(params: any) {
    this.offset = params.offset;
    this.limit = params.limit;
    try {
      this.loadList = true;
      let { data: response } = await findAll(params);
      this.pages = Math.ceil(response.totalPages);
      this.listMinisteriesOrPositions = response.content;
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadList = false;
    }
  }

  @action
  prepareCreateMinistryOrPosition = async (e: any) => {
    this.loadForm = true;
    this.form.resetForm();
    this.actionType = "CREATE";
    this.resetUpdate();
    this.loadForm = false;
  };

  @action async saveMinistryOrPosition(ministryOrPosition: any) {
    if (this.actionType === "EDIT") {
      await this.updateMinistryOrPosition(ministryOrPosition);
    } else {
      await this.postMinistryOrPosition(ministryOrPosition);
    }
  }

  @action
  async postMinistryOrPosition(dataForm: any) {
    this.loadForm = true;
    try {
      let response = await create(dataForm);
      this.tabIndex = 0;
      await this.getListMinisteriesOrPositions({ offset: this.offset, limit: this.limit });

      notify.show(
        `${response.status}  - Ministério ou Cargo criado com sucesso`,
        "custom",
        2000,
        colorMessage.success
      );
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadForm = false;
    }
  }

  @action
  prepareEditMinistryOrPosition = async (
    e: any,
    activeIndex: number,
    selectedMinistryOrPosition: MinistryOrPosition
  ) => {
    this.loadForm = true;
    this.form.resetForm();
    this.actionType = "EDIT";
    this.tabIndex = activeIndex;
    this.id = selectedMinistryOrPosition.id;

    this.resetUpdate(selectedMinistryOrPosition);

    this.loadForm = false;
  };

  @action
  async updateMinistryOrPosition(dataForm: any) {
    this.loadForm = true;
    try {
      this.tabIndex = 0;
      let response = await update(dataForm, this.id);
      await this.getListMinisteriesOrPositions({ offset: this.offset, limit: this.limit });
      notify.show(
        `${response.status}  - Ministério ou Cargo atualizado com sucesso`,
        "custom",
        2000,
        colorMessage.success
      );
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadForm = false;
    }
  }

  @action
  async prepareRemoveMinistryOrPosition(e: any, selectedMinistryOrPosition: MinistryOrPosition) {
    this.id = selectedMinistryOrPosition.id;
    this.isModalDelete = true;
  }

  @action
  async removeMinistryOrPosition() {
    this.isModalDelete = false;
    this.loadList = true;
    try {
      let response = await remove(this.id);

      await this.getListMinisteriesOrPositions({
        offset: this.offset,
        limit: this.limit
      });

      notify.show(
        `${response.status}  - Ministério ou Cargo removido com sucesso`,
        "custom",
        2000,
        colorMessage.success
      );
    } catch (err) {
      showErrorMessage(err.response);
    } finally {
      this.loadList = false;
    }
  }

  private resetUpdate(selectedMinistryOrPosition?: MinistryOrPosition) {
    this.form.resetUpdate({
      id: this.id,
      description: selectedMinistryOrPosition ? selectedMinistryOrPosition.description : null
    });
  }

  @computed
  get activeTab(): number {
    return this.tabIndex;
  }

  @computed
  get columsMasterMinisteriesOrPositions() {
    return this.columsMaster;
  }

  @computed
  get formCreateMinistryOrPosition() {
    return this.formTemplate;
  }
}

export default new MinisteriesOrPositionsStore();
