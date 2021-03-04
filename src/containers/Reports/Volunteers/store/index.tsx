import { sumBy } from 'lodash';
import { action, observable } from "mobx";
import { showErrorMessage } from "../../../../config/Messages";
import { findAll as getCitiesList } from '../../../Registrations/Cities/services';
import { mountSelectValues } from '../../../Registrations/Cities/transformer';
import { findAll as getPrayingHousesList } from '../../../Registrations/PrayingHouses/services';
import { findAll as getMinistryOrPositionList } from '../../../Registrations/MinisteriesOrPositions/services';
import { findAll } from '../../../Registrations/Volunteers/services';
import { Volunteer } from '../../../Registrations/Volunteers/types';
import { ORIGINAL_FORM_TEMPLATE } from "../constants";

const parametersTranslation = {
  city: 'Cidade',
  prayingHouse: 'Casa de Oração'
}
export class VolunteersReportStore {
  @observable formState: any = {};
  @observable form: any = {};
  @observable loadForm: boolean = false;
  @observable offset: number = 0;
  @observable limit: number = 50;
  @observable unselectedCities: any[] = [];
  @observable cities: any[] = [];
  @observable ministryOrPositions: any[] = [];
  @observable formTemplate: any[] = ORIGINAL_FORM_TEMPLATE;
  @observable prayingHouses: any[] = [];
  @observable data: any[] = [];
  @observable totalElements: number = 0;

  @action
  public async generateReport(params: any) {
    this.loadForm = true;
    this.offset = 0;
    let last = false;
    let volunteersList: any[] = [];
    do {
      let { data: response } = await findAll({ offset: this.offset, limit: this.limit, filtered: this.filtered(params) });
      volunteersList = volunteersList.concat(response.content);
      last = response.last;
      this.totalElements = response.totalElements;
      this.offset++;
    } while (!last);
    
    this.data = this.formatData(params.prayingHouse && params.prayingHouse.length > 0 ? 'prayingHouse' : 'city', volunteersList, params);
    this.loadForm = false;
  }

  private filtered(params: any) {
    let filtered = 'city.id='.concat(params.city.map((city: any) => city.value).join(','));
    if (params.prayingHouse && params.prayingHouse.length > 0) {
      filtered += '&prayingHouse.reportCode='.concat(params.prayingHouse && params.prayingHouse.map((p: any) => p.value).join(','));
    }
    filtered += '&ministryOrPosition.id='.concat(params.ministryOrPosition.map((ministryOrPosition: any) => ministryOrPosition.value).join(','));

    return filtered;
  }

  private formatData(parameterName: 'city' | 'prayingHouse', volunteersList: any[], params: any) {
    let response: any[] = [[parametersTranslation[parameterName]]];
    let count = 0;
    params[parameterName].forEach((param: any) => {
      let line: any = [];
      line.push(param.text);
      params.ministryOrPosition.forEach((ministryOrPosition: any) => {
        if (count === 0) {
          response[0].push(ministryOrPosition.text);
        }
        line.push(sumBy(this.filterVolunteerByParam(volunteersList, param, parameterName), v => v.ministryOrPosition.some((m: any) => m.id === ministryOrPosition.key) ? 1 : 0));
      });
      response.push(line);
      count++;
    });
    return response;
  }

  private filterVolunteerByParam(volunteersList: any[], param: any, parameterName: string) {
    return volunteersList.filter(v => (parameterName === 'city' ? v.city.id :  v.prayingHouse.reportCode) === param.key);
  }

  @action
  mountCitiesSelect = async () => {
    try {
      let { data: response } = await getCitiesList({ offset: 0, limit: 20, filtered: 'regional=true' });
      this.cities = response.content;
      this.unselectedCities = mountSelectValues(this.cities);
      this.formTemplate[0].row.fields[0].disabled = false;
      this.formTemplate[0].row.fields[0].data = this.unselectedCities;
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    }
  };

  @action
  async mountPrayingHousesSelect(volunteerSelected?: Volunteer) {
    this.formTemplate[0].row.fields[0].onChange = this.handlePrayingHousesSelectChange;

    if (volunteerSelected && volunteerSelected.city && volunteerSelected.city.id) {
      await this.handlePrayingHousesSelectChange(undefined, { value: volunteerSelected.city.id })
    }

    this.formTemplate[1].row.fields[2].data = this.prayingHouses;
  }

  @action
  handlePrayingHousesSelectChange = async (e: any, itemInput: any) => {
    let { data: response } = await getPrayingHousesList({ offset: 0, limit: 100, filtered: `city.id=${itemInput.value}` });
    this.prayingHouses = this.mountPrayingHousesSelectValues(response.content);
    this.formTemplate[0].row.fields[1].data = this.prayingHouses;
    this.formTemplate[0].row.fields[1].disabled = false;
  }

  @action
  async mountMinistryOrPositionSelect(volunteerSelected?: Volunteer) {
    let { data: response } = await getMinistryOrPositionList({ offset: 0, limit: 100 });
    this.formTemplate[0].row.fields[2].data = this.mountMinistryOrPositionSelectValues(response.content);
    this.formTemplate[0].row.fields[2].defaultData = [];
    if (volunteerSelected) {
      this.formTemplate[0].row.fields[2].defaultData = this.mountMinistryOrPositionSelectValues(volunteerSelected.ministryOrPosition);
    }
  }


  @action
  formChangeHandler = async (input: any, allData: any) => {
    this.loadForm = true;
    if (input && input.city) {
      if (input.city.length === 1) {
        let { data: response } = await getPrayingHousesList({ offset: 0, limit: 100, filtered: `city.id=${input.city[0].value}` });
        this.prayingHouses = this.mountPrayingHousesSelectValues(response.content);
        this.formTemplate[0].row.fields[1].data = this.prayingHouses;
        this.formTemplate[0].row.fields[1].disabled = false;
      } else {
        this.formTemplate[0].row.fields[1].data = [];
        this.formTemplate[0].row.fields[1].disabled = true;
      }
      this.form.handleChangeMultSelect("prayingHouse", null);
      this.formTemplate[0].row.fields[1].defaultValue= [];
      this.formTemplate[0].row.fields[1].defaultData= [];
    }
    this.loadForm = false;
  }

  private mountMinistryOrPositionSelectValues(obj: any) {
    return obj.map((item: any) => {
      return {
        key: item.id,
        text: item.description,
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
}

export default new VolunteersReportStore();
