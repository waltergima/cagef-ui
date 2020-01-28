import { Button, Popup } from "maga-components";
import { action, computed, observable } from "mobx";
import * as React from "react";
import { notify } from "react-notify-toast";
import { colorMessage } from "../../../../config/Const";
import { showErrorMessage } from "../../../../config/Messages";
import { hasRole, userData } from "../../../../config/Utils";
import { findAll as getCitiesList, findById as findCityById } from '../../Cities/services';
import { mountSelectValues } from "../../Cities/transformer";
import { findAll as getMinistryOrPositionList } from '../../MinisteriesOrPositions/services';
import { findAll as getPrayingHousesList } from '../../PrayingHouses/services';
import { ORIGINAL_FORM_TEMPLATE } from "../constants";
import { findAll, create, remove, update, findAllInstruments } from '../services';
// import { findAll } from '../../Volunteers/services';
import { transformMusician } from '../transformer';
import { Musician, Instrument } from "../types";
import * as dateFns from 'date-fns';
import { SelectItem } from "../../types";

export class MusiciansStore {
  @observable offset: number = 0;
  @observable limit: number = 10;
  @observable branch: number = 0;
  @observable tabIndex: number = 0;
  @observable pages: number = 0;
  @observable pageSize: number = 10;
  @observable loadList: boolean = false;
  @observable loadForm: boolean = false;
  @observable listMusicians: any[] = [];
  @observable actionType: string = "";
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
                  this.prepareEditMusician(this, 1, row.original)
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
                  this.prepareRemoveMusician(this, row.original);
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
      Cell: (row: any) => { return (<span> {row.original.city.name}</span >) }
    },
    {
      Header: "Ministérios",
      id: "ministryOrPosition.description",
      Cell: (row: any) => {
        return row.original.ministryOrPosition.map((m: any) => <span>{m.description}<br></br></span>)
      }
    },
    {
      Header: "Instrumento",
      id: "instrument.description",
      Cell: (row: any) => {
        return row.original.instrument ? <span>{row.original.instrument.description}</span> : null
      }
    }
  ];

  @action
  handleTabChange = (e: any, tabIndex: any) => {
    if (tabIndex.activeIndex === 1) {
      this.form.resetForm();
      this.prepareCreateMusician(this, {
        activeIndex: 1
      });
    }
    this.tabIndex = tabIndex.activeIndex;
  };

  @action
  async getListMusicians(params: any) {
    this.offset = params.offset;
    this.limit = params.limit;
    //params.filtered = params.filtered.concat(`${params.filtered && params.filtered.length > 0 ? '&' : ''}ministryOrPosition.id=28,29,30,32,33,49`);
    try {
      this.loadList = true;
      let { data: response } = await findAll(params);
      this.pages = Math.ceil(response.totalPages);
      this.listMusicians = response.content;
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadList = false;
    }
  }

  @action async saveMusician(musician: Musician) {
    console.log('musician: ' + JSON.stringify(musician));
    if (this.actionType === "EDIT") {
      await this.updateMusician(musician);
    } else {
      await this.postMusician(musician);
    }
  }

  @action
  prepareCreateMusician = async (e: any, tabIndex: any) => {
    this.form.resetForm();
    this.loadForm = true;

    this.actionType = "CREATE";
    this.tabIndex = tabIndex.activeIndex;

    await this.mountMinistryOrPositionSelect();

    await this.mountCitiesSelect();

    await this.mountNaturalnessSelect();

    await this.mountPrayingHousesSelect();

    await this.mountInstrumentsSelect();

    this.resetUpdate();
    this.loadForm = false;
  };

  @action
  async postMusician(dataForm: any) {
    this.loadForm = true;
    let musician = transformMusician(dataForm);
    try {
      let response = await create(musician);
      this.tabIndex = 0;
      this.getListMusicians({ offset: this.offset, limit: this.limit });

      notify.show(
        `${response.status}  - Músico criado com sucesso`,
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
  prepareEditMusician = async (
    e: any,
    activeIndex: number,
    musicianSelected: Musician
  ) => {
    this.loadForm = true;
    this.form.resetForm();
    this.actionType = "EDIT";
    this.tabIndex = activeIndex;
    this.id = musicianSelected.id
    await this.mountInstrumentsSelect(musicianSelected);

    await this.mountMinistryOrPositionSelect(musicianSelected);

    await this.mountCitiesSelect();

    await this.mountPrayingHousesSelect(musicianSelected);


    this.resetUpdate(musicianSelected);
    this.loadForm = false;
  };

  @action
  async updateMusician(dataForm: any) {
    this.loadForm = true;
    let musician = transformMusician(dataForm);
    try {
      let response = await update(musician, this.id);
      await this.getListMusicians({ offset: this.offset, limit: this.limit });
      notify.show(
        `${response.status}  - Músico atualizado com sucesso`,
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
  async prepareRemoveMusician(e: any, musicianSelected: Musician) {
    await this.removeMusician(musicianSelected);
  }

  @action
  async removeMusician(musicianSelected: Musician) {
    this.loadList = true;
    try {
      let response = await remove(musicianSelected.id);

      await this.getListMusicians({
        offset: this.offset,
        limit: this.limit
      });

      notify.show(
        `${response.status}  - Músico removido com sucesso`,
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
      if (hasRole()) {
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
  async mountMinistryOrPositionSelect(musicianSelected?: Musician) {
    let { data: response } = await getMinistryOrPositionList({ offset: 0, limit: 100, filtered: 'id.in=28,29,30,32,33,49' });
    this.formTemplate[0].row.fields[0].data = this.mountMinistryOrPositionSelectValues(response.content);
    this.formTemplate[0].row.fields[0].defaultData = [];
    if (musicianSelected) {
      this.formTemplate[0].row.fields[0].defaultData = this.mountMinistryOrPositionSelectValues(musicianSelected.ministryOrPosition);
    }
  }

  @action
  async mountPrayingHousesSelect(musicianSelected?: Musician) {
    this.formTemplate[1].row.fields[1].onChange = this.handlePrayingHousesSelectChange;

    if (musicianSelected && musicianSelected.city && musicianSelected.city.id) {
      await this.handlePrayingHousesSelectChange(undefined, { value: musicianSelected.city.id })
    }

    this.formTemplate[1].row.fields[2].data = this.prayingHouses;
  }

  @action
  async mountInstrumentsSelect(musicianSelected?: Musician) {
    let { data: response } = await findAllInstruments({ offset: 0, limit: 100 });
    this.formTemplate[3].row.fields[0].data = this.mountInstrumentSelectValues(response.content);
    if (musicianSelected) {

    }
  }

  @action
  handlePrayingHousesSelectChange = async (e: any, itemInput: any) => {
    let { data: data } = await getPrayingHousesList({ offset: 0, limit: 100, filtered: `city.id=${itemInput.value}` });
    this.prayingHouses = this.mountPrayingHousesSelectValues(data.content);
    this.formTemplate[1].row.fields[2].data = this.prayingHouses;
    this.formTemplate[1].row.fields[2].disabled = false;
  }


  @action
  formChangeHandler = async (input: any, allData: any) => {
    if (input && input.city) {
      this.loadForm = true;
      let { data: data } = await getPrayingHousesList({ offset: 0, limit: 100, filtered: `city.id=${input.city.value}` });
      this.prayingHouses = this.mountPrayingHousesSelectValues(data.content);
      this.formTemplate[1].row.fields[2].data = this.prayingHouses;
      this.formTemplate[1].row.fields[2].disabled = false;
      this.loadForm = false;
    }
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

  private mountInstrumentSelectValues = (instruments: Instrument[]): SelectItem[] => {
    return instruments.map((item) => {
      return new SelectItem(item.id, String(item.description), item.id);
    });
  };

  private resetUpdate(musicianSelected?: any) {
    console.log('musicianSelected.city: ' + musicianSelected!.city.id);
    this.form.resetUpdate({
      id: this.id,
      name: musicianSelected ? musicianSelected.name : null,
      city: musicianSelected && musicianSelected.city ? musicianSelected.city.id : null,
      phoneNumber: musicianSelected ? musicianSelected.phoneNumber : null,
      celNumber: musicianSelected ? musicianSelected.celNumber : null,
      email: musicianSelected ? musicianSelected.email : null,
      dateOfBirth: musicianSelected && musicianSelected.dateOfBirth ? dateFns.parseISO(musicianSelected.dateOfBirth) : null,
      prayingHouse: musicianSelected && musicianSelected.prayingHouse ? musicianSelected.prayingHouse.reportCode : null,
      instrument: musicianSelected && musicianSelected.instrument ? musicianSelected.instrument.id : null,
      oficializationDate: musicianSelected && musicianSelected.oficializationDate ? dateFns.parseISO(musicianSelected.oficializationDate) : null
    });

    // this.formTemplate[1].row.fields[1].defaultValue = musicianSelected && musicianSelected.city ? { "key": musicianSelected.city.id, "text": musicianSelected.city.name, "value": musicianSelected.city.id } : null;
    this.formTemplate[2].row.fields[0].defaultValue = musicianSelected ? musicianSelected.phoneNumber : null;
    this.formTemplate[2].row.fields[1].defaultValue = musicianSelected ? musicianSelected.celNumber : null;
    this.formTemplate[2].row.fields[3].defaultValue = musicianSelected && musicianSelected.dateOfBirth ? dateFns.parseISO(musicianSelected.dateOfBirth) : null;
    this.formTemplate[3].row.fields[1].defaultValue = musicianSelected && musicianSelected.oficializationDate ? dateFns.parseISO(musicianSelected.oficializationDate) : null;

    this.form.handleChangeMultSelect("city", { value: musicianSelected && musicianSelected.city ? musicianSelected.city.id : null });

    this.form.handleChangeMultSelect("prayingHouse", { value: musicianSelected && musicianSelected.prayingHouse ? musicianSelected.prayingHouse.reportCode : null });

    this.form.handleChangeMultSelect("instrument", { value: musicianSelected && musicianSelected.instrument ? musicianSelected.instrument.id : null });


  }

  @computed
  get activeTab(): number {
    return this.tabIndex;
  }

  @computed
  get columsMasterMusicians() {
    return this.columsMaster;
  }

  @computed
  get formCreateMusician() {
    return this.formTemplate;
  }
}

export default new MusiciansStore();
