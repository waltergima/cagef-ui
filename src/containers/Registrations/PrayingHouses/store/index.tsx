import { Button, Popup } from "maga-components";
import { action, computed, observable } from "mobx";
import * as React from "react";
import { notify } from "react-notify-toast";
import { colorMessage } from "../../../../config/Const";
import { showErrorMessage } from "../../../../config/Messages";
import { hasRole, userData } from "../../../../config/Utils";
import { findAll as findAllCities, findById } from '../../Cities/services';
import { City } from "../../Cities/types";
import { SelectItem } from "../../types";
import { ORIGINAL_FORM_TEMPLATE } from '../constants';
import { create, findAll, remove, update } from '../services';
import { transformPrayingHouse } from '../transformer';
import { PrayingHouse } from "../types";
import { mountSelectValues } from "../../Cities/transformer";

export class PrayingHousesStore {
  @observable offset: number = 0;
  @observable limit: number = 10;
  @observable branch: number = 0;
  @observable tabIndex: number = 0;
  @observable pages: number = 0;
  @observable pageSize: number = 10;
  @observable loadList: boolean = false;
  @observable loadForm: boolean = false;
  @observable listPrayingHouses: PrayingHouse[] = [];
  @observable actionType: string = "";
  @observable formState: any = {};
  @observable form: any = {};
  @observable unselectedCities: SelectItem[] = [];
  @observable cities: City[] = [];
  @observable reportCode: string = ""
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
                  this.prepareEditPrayingHouse(this, 1, row.original)
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
                  this.prepareRemovePrayingHouse(this, row.original);
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
      Header: "Cod Relatório",
      accessor: "reportCode",
      maxWidth: 120
    },
    {
      Header: "Bairro",
      accessor: "district"
    },
    {
      Header: "Cidade",
      id: "city.name",
      Cell: (row: any) => { return (<span> {row.original.city.name}</span >) }
    },
    {
      Header: "Estado",
      id: "state",
      filterable: false,
      maxWidth: 60,
      Cell: (row: any) => { return (<span> {row.original.city.state}</span >) }
    }
  ];

  @action
  handleTabChange = (e: any, tabIndex: any) => {
    if (tabIndex.activeIndex === 1) {
      this.form.resetForm();
      this.prepareCreatePrayingHouse(this, {
        activeIndex: 1
      });
    }
    this.tabIndex = tabIndex.activeIndex;
  };

  @action
  mountCitiesSelect = async () => {
    if (hasRole()) {
      let response = await findAllCities({ offset: 0, limit: 30, filtered: 'regional=true' });
      this.cities = response.data.content;
      this.unselectedCities = mountSelectValues(this.cities);
      this.formTemplate[0].row.fields[2].disabled = false;
    } else {
      let { data: response } = await findById(userData().city);
      this.cities = [response];
      this.unselectedCities = mountSelectValues(this.cities);
      this.formTemplate[0].row.fields[2].disabled = true;
    }
    this.formTemplate[0].row.fields[2].data = this.unselectedCities;
  };

  @action
  async getListPrayingHouses(params: any) {
    this.offset = params.offset;
    this.limit = params.limit;
    try {
      this.loadList = true;
      let { data: response } = await findAll(params);
      this.pages = Math.ceil(response.totalPages);
      this.listPrayingHouses = response.content;
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadList = false;
    }
  }

  @action
  prepareCreatePrayingHouse = async (e: any, tabIndex: any) => {
    this.form.resetForm();
    this.loadForm = true;
    this.actionType = "CREATE";
    await this.mountCitiesSelect();
    this.resetUpdate();
    this.loadForm = false;
  };

  @action async savePrayingHouse(prayingHouse: any) {
    if (this.actionType === "EDIT") {
      await this.updatePrayingHouse(prayingHouse);
    } else {
      await this.postPrayingHouse(prayingHouse);
    }
  }

  @action
  async postPrayingHouse(dataForm: any) {
    this.loadForm = true;
    let prayingHouse = transformPrayingHouse(dataForm);
    try {
      let response = await create(prayingHouse);
      this.tabIndex = 0;
      this.getListPrayingHouses({ offset: this.offset, limit: this.limit });

      notify.show(
        `${response.status}  - Casa de oração criada com sucesso`,
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
  prepareEditPrayingHouse = async (
    e: any,
    activeIndex: number,
    selectedPrayingHouse: PrayingHouse
  ) => {
    this.loadForm = true;
    await this.mountCitiesSelect();
    this.form.resetForm();
    this.actionType = "EDIT";
    this.tabIndex = activeIndex;
    this.reportCode = selectedPrayingHouse.reportCode

    this.resetUpdate(selectedPrayingHouse);

    this.loadForm = false;
  };

  @action
  async updatePrayingHouse(dataForm: any) {
    this.loadForm = true;
    let prayingHouse = transformPrayingHouse(dataForm);
    try {

      this.tabIndex = 0;
      let response = await update(prayingHouse, this.reportCode);
      this.getListPrayingHouses({ offset: this.offset, limit: this.limit });
      notify.show(
        `${response.status}  - Casa de oração atualizada com sucesso`,
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
  async prepareRemovePrayingHouse(e: any, selectedPrayingHouse: PrayingHouse) {
    this.reportCode = selectedPrayingHouse.reportCode;
    this.isModalDelete = true;
  }

  @action
  async removePrayingHouse() {
    this.isModalDelete = false;
    this.loadList = true;
    try {
      let response = await remove(this.reportCode);

      await this.getListPrayingHouses({
        offset: this.offset,
        limit: this.limit
      });

      notify.show(
        `${response.status}  - Casa de oração removida com sucesso`,
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

  private resetUpdate(selectedPrayingHouse?: PrayingHouse) {
    this.form.resetUpdate({
      reportCode: selectedPrayingHouse ? selectedPrayingHouse.reportCode : null,
      district: selectedPrayingHouse ? selectedPrayingHouse.district : null,
      city: selectedPrayingHouse && selectedPrayingHouse.city ? selectedPrayingHouse.city.id : this.cities[0].id
    });
    this.form.handleChangeMultSelect("city", selectedPrayingHouse && selectedPrayingHouse.city ? selectedPrayingHouse.city.id : this.cities[0].id);
  }

  @computed
  get activeTab(): number {
    return this.tabIndex;
  }

  @computed
  get columsMasterPrayingHouses() {
    return this.columsMaster;
  }

  @computed
  get formCreatePrayingHouse() {
    return this.formTemplate;
  }
}

export default new PrayingHousesStore();
