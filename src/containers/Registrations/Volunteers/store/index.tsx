import { Button, Popup } from "maga-components";
import { action, computed, observable } from "mobx";
import * as React from "react";
import { notify } from "react-notify-toast";
import { colorMessage } from "../../../../config/Const";
import { showErrorMessage } from "../../../../config/Messages";
import { isAdmin, userData } from "../../../../config/Utils";
import { findAll as getCitiesList, findById as findCityById } from '../../Cities/services';
import { mountSelectValues } from "../../Cities/transformer";
import { findAll as getMinistryOrPositionList } from '../../MinisteriesOrPositions/services';
import { findAll as getPrayingHousesList } from '../../PrayingHouses/services';
import { ORIGINAL_FORM_TEMPLATE } from "../constants";
import { create, findAll, remove, update } from '../services';
import { transformVolunteer } from '../transformer';
import { Volunteer } from "../types";

class VolunteersStore {
  @observable offset: number = 0;
  @observable limit: number = 10;
  @observable branch: number = 0;
  @observable tabIndex: number = 0;
  @observable pages: number = 0;
  @observable pageSize: number = 10;
  @observable loadList: boolean = false;
  @observable loadForm: boolean = false;
  @observable listVolunteers: any[] = [];
  @observable actionType: string = "";
  @observable formState: any = {};
  @observable form: any = {};
  @observable unselectedCities: any[] = [];
  @observable cities: any[] = [];
  @observable naturalnessCities: any[] = [];
  @observable ministryOrPositions: any[] = [];
  @observable prayingHouses: any[] = [];
  @observable id: number = 0;
  @observable formTemplate: any[] = ORIGINAL_FORM_TEMPLATE;

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
                  this.prepareEditVolunteer(this, 1, row.original)
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
                  this.prepareRemoveVolunteer(this, row.original);
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
      Header: "Id",
      accessor: "id",
      maxWidth: 120
    },
    {
      Header: "Nome",
      accessor: "name"
    },
    {
      Header: "Cidade",
      id: "city.name",
      acessor: 'city',
      Cell: (row: any) => { return (<span> {row.original.city.name}</span >) }
    },
    {
      Header: "Ministérios",
      id: "ministryOrPosition.description",
      Cell: (row: any) => {
        return row.original.ministryOrPosition.map((m: any) => <span>{m.description}<br></br></span>)
      }
    }
  ];

  @action
  handleTabChange = (e: any, tabIndex: any) => {
    if (tabIndex.activeIndex === 1) {
      this.form.resetForm();
      this.prepareCreateVolunteer(this, {
        activeIndex: 1
      });
    }
    this.tabIndex = tabIndex.activeIndex;
  };

  @action
  async getListVolunteers(params: any) {
    this.offset = params.offset;
    this.limit = params.limit;
    try {
      this.loadList = true;
      let { data: response } = await findAll(params);
      this.pages = Math.ceil(response.totalPages);
      this.listVolunteers = response.content;
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadList = false;
    }
  }

  @action async saveVolunteer(volunteer: any) {
    if (this.actionType === "EDIT") {
      await this.updateVolunteer(volunteer);
    } else {
      await this.postVolunteer(volunteer);
    }
  }

  @action
  prepareCreateVolunteer = async (e: any, tabIndex: any) => {
    this.form.resetForm();
    this.loadForm = true;

    this.actionType = "CREATE";
    this.tabIndex = tabIndex.activeIndex;

    await this.mountMinistryOrPositionSelect();

    await this.mountCitiesSelect();

    await this.mountNaturalnessSelect();

    await this.mountPrayingHousesSelect();

    this.resetUpdate();
    this.loadForm = false;
  };

  @action
  async postVolunteer(dataForm: any) {
    this.loadForm = true;
    let volunteer = transformVolunteer(dataForm);
    try {
      let response = await create(volunteer);
      this.tabIndex = 0;
      this.getListVolunteers({ offset: this.offset, limit: this.limit });

      notify.show(
        `${response.status}  - Voluntário criado com sucesso`,
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
  prepareEditVolunteer = async (
    e: any,
    activeIndex: number,
    volunteerSelected: Volunteer
  ) => {
    this.form.resetForm();
    this.loadForm = true;
    this.actionType = "EDIT";
    this.tabIndex = activeIndex;
    this.id = volunteerSelected.id

    await this.mountCitiesSelect();
    await this.mountNaturalnessSelect(volunteerSelected.naturalness);

    await this.mountMinistryOrPositionSelect(volunteerSelected);

    await this.mountPrayingHousesSelect(volunteerSelected);

    this.resetUpdate(volunteerSelected);
    this.loadForm = false;
  };

  @action
  async updateVolunteer(dataForm: any) {
    this.loadForm = true;
    let volunteer = transformVolunteer(dataForm);
    try {
      let response = await update(volunteer, this.id);
      await this.getListVolunteers({ offset: this.offset, limit: this.limit });
      notify.show(
        `${response.status}  - Voluntário atualizado com sucesso`,
        "custom",
        2000,
        colorMessage.success
      );
      this.tabIndex = 0;
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadForm = false;
    }
  }

  @action
  async prepareRemoveVolunteer(e: any, volunteerSelected: Volunteer) {
    await this.removeVolunteer(volunteerSelected);
  }

  @action
  async removeVolunteer(volunteerSelected: Volunteer) {
    this.loadList = true;
    try {
      let response = await remove(volunteerSelected.id);

      await this.getListVolunteers({
        offset: this.offset,
        limit: this.limit
      });

      notify.show(
        `${response.status}  - Voluntário removido com sucesso`,
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
  mountCitiesSelect = async () => {
    try {
      if (isAdmin()) {
        let { data: data } = await getCitiesList({ offset: 0, limit: 20, filtered: 'regional=true' });
        this.cities = data.content;
        this.unselectedCities = mountSelectValues(this.cities);
        this.formTemplate[1].row.fields[1].disabled = false;
      } else {
        let cityId = userData().city;
        let { data: data } = await findCityById(cityId);
        this.cities = [data];
        this.unselectedCities = mountSelectValues(this.cities);
        this.formTemplate[1].row.fields[1].disabled = true;
      }
      this.formTemplate[1].row.fields[1].data = this.unselectedCities;
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    }
  };

  @action
  public handleSearchChange = async (e: any, { searchQuery }: any) => {
    this.loadForm = true;
    try {
      let response = await getCitiesList({ offset: 0, limit: 30, filtered: `name=${searchQuery}` });
      this.naturalnessCities = mountSelectValues(response.data.content);
      this.formTemplate[2].row.fields[3].data = this.naturalnessCities;
    } catch (error) {
      console.log(error);
    } finally {
      this.loadForm = false;
    }
  };


  @action
  async mountNaturalnessSelect(naturalness?: { id: number; }) {
    this.naturalnessCities = [];
    if (naturalness && naturalness.id) {
      let naturalnessResponse: any = await findCityById(naturalness.id);
      this.naturalnessCities = mountSelectValues([naturalnessResponse.data]);
    }
    this.formTemplate[2].row.fields[3].handleSearchChange = this.handleSearchChange;
    this.formTemplate[2].row.fields[3].data = this.naturalnessCities;
  }

  @action
  async mountMinistryOrPositionSelect(volunteerSelected?: Volunteer) {
    let { data: response } = await getMinistryOrPositionList({ offset: 0, limit: 100 });
    this.formTemplate[0].row.fields[0].data = this.mountMinistryOrPositionSelectValues(response.content);
    if (volunteerSelected) {
      this.formTemplate[0].row.fields[0].defaultData = this.mountMinistryOrPositionSelectValues(volunteerSelected.ministryOrPosition);
    }
  }

  @action
  async mountPrayingHousesSelect(volunteerSelected?: Volunteer) {
    this.formTemplate[1].row.fields[1].onChange = this.handlePrayingHousesSelectChange;

    if (volunteerSelected && volunteerSelected.city && volunteerSelected.city.id) {
      await this.handlePrayingHousesSelectChange(undefined, { value: volunteerSelected.city.id })
    }

    this.formTemplate[1].row.fields[2].data = this.prayingHouses;
  }

  @action
  handlePrayingHousesSelectChange = async (e: any, itemInput: any) => {
    let { data: data } = await getPrayingHousesList({ offset: 0, limit: 100, filtered: `city.id=${itemInput.value}` });
    this.prayingHouses = this.mountPrayingHousesSelectValues(data.content);
    this.formTemplate[1].row.fields[2].data = this.prayingHouses;
    this.formTemplate[1].row.fields[2].disabled = false;
  }

  private mountMinistryOrPositionSelectValues(obj: any) {
    return obj.map((item: any) => {
      return {
        id: item.id,
        label: item.description,
        value: item.id
      }
    });
  }

  private mountPrayingHousesSelectValues(obj: any) {
    return obj.map((item: any) => {
      return {
        key: item.reportCode,
        text: item.district,
        value: item.reportCode
      }
    });
  }

  private resetUpdate(volunteerSelected?: Volunteer) {
    this.form.resetUpdate({
      id: this.id,
      name: volunteerSelected ? volunteerSelected.name : null,
      city: volunteerSelected && volunteerSelected.city ? volunteerSelected.city.id : null,
      address: volunteerSelected ? volunteerSelected.address : null,
      district: volunteerSelected ? volunteerSelected.district : null,
      zipCode: volunteerSelected ? volunteerSelected.zipCode : null,
      phoneNumber: volunteerSelected ? volunteerSelected.phoneNumber : null,
      celNumber: volunteerSelected ? volunteerSelected.celNumber : null,
      email: volunteerSelected ? volunteerSelected.email : null,
      dateOfBirth: volunteerSelected ? new Date(volunteerSelected.dateOfBirth) : null,
      naturalness: volunteerSelected && volunteerSelected.naturalness ? volunteerSelected.naturalness.id : null,
      dateOfBaptism: volunteerSelected ? new Date(volunteerSelected.dateOfBaptism) : null,
      cpf: volunteerSelected ? volunteerSelected.cpf : null,
      rg: volunteerSelected ? volunteerSelected.rg : null,
      maritalStatus: volunteerSelected ? volunteerSelected.maritalStatus : null,
      ministryApresentationDate: volunteerSelected ? new Date(volunteerSelected.ministryApresentationDate) : null,
      promise: volunteerSelected ? volunteerSelected.promise : null,
      prayingHouse: volunteerSelected && volunteerSelected.prayingHouse ? volunteerSelected.prayingHouse.reportCode : null
    });


    this.formTemplate[3].row.fields[0].defaultValue = volunteerSelected ? volunteerSelected.phoneNumber : null;
    this.formTemplate[3].row.fields[1].defaultValue = volunteerSelected ? volunteerSelected.celNumber : null;
    this.formTemplate[4].row.fields[1].defaultValue = volunteerSelected ? volunteerSelected.cpf : null;
    this.formTemplate[2].row.fields[2].defaultValue = volunteerSelected ? volunteerSelected.zipCode : null;
    this.formTemplate[3].row.fields[3].defaultValue = volunteerSelected ? volunteerSelected.dateOfBirth : null;
    this.formTemplate[4].row.fields[0].defaultValue = volunteerSelected ? volunteerSelected.dateOfBaptism : null;
    this.formTemplate[5].row.fields[0].defaultValue = volunteerSelected ? volunteerSelected.ministryApresentationDate : null;

  }

  @computed
  get activeTab(): number {
    return this.tabIndex;
  }

  @computed
  get columsMasterVolunteers() {
    return this.columsMaster;
  }

  @computed
  get formCreateVolunteer() {
    return this.formTemplate;
  }
}

export default new VolunteersStore();
