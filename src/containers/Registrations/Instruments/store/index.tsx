import { Button, Popup } from "maga-components";
import { action, computed, observable } from "mobx";
import * as React from "react";
import { notify } from "react-notify-toast";
import { colorMessage } from "../../../../config/Const";
import { showErrorMessage } from "../../../../config/Messages";
import { SelectItem } from "../../types";
import { ORIGINAL_FORM_TEMPLATE } from '../constants';
import { create, findAll, remove, update, findAllCategories } from '../services';
import { Instrument } from "../types";
import { transform, mountSelectValues } from '../transformer';

export class InstrumentsStore {
  @observable offset: number = 0;
  @observable limit: number = 10;
  @observable branch: number = 0;
  @observable tabIndex: number = 0;
  @observable pages: number = 0;
  @observable pageSize: number = 10;
  @observable loadList: boolean = false;
  @observable loadForm: boolean = false;
  @observable listInstruments: Instrument[] = [];
  @observable actionType: string = "";
  @observable formState: any = {};
  @observable form: any = {};
  @observable unselectedInstruments: SelectItem[] = [];
  @observable instruments: Instrument[] = [];
  @observable id: number = 0;
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
                  this.prepareEditInstrument(this, 1, row.original)
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
                  this.prepareRemoveInstrument(this, row.original);
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
      Header: "Nome",
      accessor: "description"
    },
    {
      Header: "Categoria",
      id: "category.description",
      Cell: (row: any) => { return (<span> {row.original.category.description}</span >) }
    }
  ];

  @action
  handleTabChange = (e: any, tabIndex: any) => {
    if (tabIndex.activeIndex === 1) {
      this.form.resetForm();
      this.prepareCreateInstrument(this, {
        activeIndex: 1
      });
    }
    this.tabIndex = tabIndex.activeIndex;
  };

  @action
  prepareRemoveInstrument(e: any, selectedInstrument: Instrument) {
    this.id = selectedInstrument.id;
    this.isModalDelete = true;
  }

  @action
  async getListInstruments(params: any) {
    this.offset = params.offset;
    this.limit = params.limit;
    try {
      this.loadList = true;
      let { data: response } = await findAll(params);
      this.pages = Math.ceil(response.totalPages);
      this.listInstruments = response.content;
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadList = false;
    }
  }

  @action async saveInstrument(city: any) {
    if (this.actionType === "EDIT") {
      await this.updateInstrument(city);
    } else {
      await this.postInstrument(city);
    }
  }

  @action
  async postInstrument(dataForm: any) {
    this.loadForm = true;
    try {
      let response = await create(transform(dataForm));
      this.tabIndex = 0;
      await this.getListInstruments({ offset: this.offset, limit: this.limit });

      notify.show(
        `${response.status}  - Instrumento criado com sucesso`,
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
  prepareCreateInstrument = async (e: any, tabIndex: any) => {
    this.form.resetForm();
    this.loadForm = true;
    this.actionType = "CREATE";
    await this.mountCategoriesSelect();
    this.resetUpdate();
    this.loadForm = false;
  };

  @action
  async updateInstrument(dataForm: any) {
    this.loadForm = true;
    try {
      this.tabIndex = 0;
      let response = await update(transform(dataForm), this.id);
      await this.getListInstruments({ offset: this.offset, limit: this.limit });
      notify.show(
        `${response.status}  - Instrumento atualizado com sucesso`,
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
  async removeInstrument() {
    this.isModalDelete = false;
    this.loadList = true;
    try {
      let response = await remove(this.id);

      await this.getListInstruments({
        offset: this.offset,
        limit: this.limit
      });

      notify.show(
        `${response.status}  - Instrumento removido com sucesso`,
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

  @action
  prepareEditInstrument = async (
    e: any,
    activeIndex: number,
    selectedInstrument: Instrument
  ) => {
    this.loadForm = true;
    this.form.resetForm();
    this.actionType = "EDIT";
    this.tabIndex = activeIndex;
    this.id = selectedInstrument.id;

    await this.mountCategoriesSelect();
    this.resetUpdate(selectedInstrument);

    this.loadForm = false;
  };

  @action
  async mountCategoriesSelect() {
    let { data: response } = await findAllCategories({ offset: 0, limit: 100, filtered: 'orderBy=description' });
    this.formTemplate[0].row.fields[1].data = mountSelectValues(response.content);
  }

  private resetUpdate(selectedInstrument?: Instrument) {
    this.form.resetUpdate({
      id: this.id,
      description: selectedInstrument ? selectedInstrument.description : null,
      category: selectedInstrument && selectedInstrument.category ? selectedInstrument.category.id : null,
    });
    this.form.handleChangeMultSelect("category", { value: selectedInstrument && selectedInstrument.category ? selectedInstrument.category.id : null });
  }

  @computed
  get activeTab(): number {
    return this.tabIndex;
  }

  @computed
  get columsMasterInstruments() {
    return this.columsMaster;
  }

  @computed
  get formCreateInstrument() {
    return this.formTemplate;
  }
}

export default new InstrumentsStore();
