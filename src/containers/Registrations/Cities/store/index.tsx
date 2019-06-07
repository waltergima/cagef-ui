import { Button, Popup } from "maga-components";
import { action, computed, observable } from "mobx";
import * as React from "react";
import { notify } from "react-notify-toast";
import { colorMessage } from "../../../../config/Const";
import { showErrorMessage } from "../../../../config/Messages";
import { SelectItem } from "../../types";
import { ORIGINAL_FORM_TEMPLATE } from '../constants';
import { create, findAll, remove, update } from '../services';
import { City } from "../types";

export class CitiesStore {
  @observable offset: number = 0;
  @observable limit: number = 10;
  @observable branch: number = 0;
  @observable tabIndex: number = 0;
  @observable pages: number = 0;
  @observable pageSize: number = 10;
  @observable loadList: boolean = false;
  @observable loadForm: boolean = false;
  @observable listCities: City[] = [];
  @observable actionType: string = "";
  @observable formState: any = {};
  @observable form: any = {};
  @observable unselectedCities: SelectItem[] = [];
  @observable cities: City[] = [];
  @observable id: number = -1;
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
                  this.prepareEditCity(this, 1, row.original)
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
                  this.prepareRemoveCity(this, row.original);
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
      accessor: "name"
    },
    {
      Header: "Estado",
      accessor: "state"
    },
    {
      Header: "Pertence à Regional",
      id: "regional",
      filterable: false,
      Cell: (row: any) => { return (<span> {row.original.regional ? 'SIM' : 'NÃO'}</span >) }
    }
  ];

  @action
  handleTabChange = (e: any, tabIndex: any) => {
    if (tabIndex.activeIndex === 1) {
      this.form.resetForm();
      this.prepareCreateCity(this, {
        activeIndex: 1
      });
    }
    this.tabIndex = tabIndex.activeIndex;
  };

  @action
  prepareRemoveCity(e: any, selectedCity: City) {
    this.removeCity(selectedCity);
  }

  @action
  async getListCities(params: any) {
    this.offset = params.offset;
    this.limit = params.limit;
    try {
      this.loadList = true;
      let { data: response } = await findAll(params);
      this.pages = Math.ceil(response.totalPages);
      this.listCities = response.content;
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadList = false;
    }
  }

  @action async saveCity(city: any) {
    if (this.actionType === "EDIT") {
      await this.updateCity(city);
    } else {
      await this.postCity(city);
    }
  }

  @action
  async postCity(dataForm: any) {
    this.loadForm = true;
    try {
      let response = await create(dataForm);
      this.tabIndex = 0;
      await this.getListCities({ offset: this.offset, limit: this.limit });

      notify.show(
        `${response.status}  - Cidade criada com sucesso`,
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
  prepareCreateCity = async (e: any, tabIndex: any) => {
    this.loadForm = true;
    this.form.resetForm();
    this.actionType = "CREATE";
    this.resetUpdate();
    this.loadForm = false;
  };

  @action
  async updateCity(dataForm: any) {
    this.loadForm = true;
    try {
      this.tabIndex = 0;
      let response = await update(dataForm, this.id);
      await this.getListCities({ offset: this.offset, limit: this.limit });
      notify.show(
        `${response.status}  - Cidade atualizada com sucesso`,
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
  async removeCity(selectedCity: City) {
    this.loadList = true;
    try {
      let response = await remove(selectedCity.id);

      await this.getListCities({
        offset: this.offset,
        limit: this.limit
      });

      notify.show(
        `${response.status}  - Cidade removida com sucesso`,
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
  prepareEditCity = async (
    e: any,
    activeIndex: number,
    selectedCity: City
  ) => {
    this.loadForm = true;
    this.form.resetForm();
    this.actionType = "EDIT";
    this.tabIndex = activeIndex;
    this.id = selectedCity.id;

    this.resetUpdate(selectedCity);

    this.loadForm = false;
  };

  private resetUpdate(selectedCity?: City) {
    this.form.resetUpdate({
      id: this.id,
      name: selectedCity ? selectedCity.name : null,
      state: selectedCity ? selectedCity.state : null,
      regional: selectedCity ? selectedCity.regional : false
    });
  }

  @computed
  get activeTab(): number {
    return this.tabIndex;
  }

  @computed
  get columsMasterCities() {
    return this.columsMaster;
  }

  @computed
  get formCreateCity() {
    return this.formTemplate;
  }
}

export default new CitiesStore();
