import { action, observable } from "mobx";
import { getVolunteerReport } from "../service";
import { transformReportData } from "../transformmer";
import { findAll as getCitiesList } from '../../../Registrations/Cities/services';
import { findAll as getMinistryOrPositionList } from '../../../Registrations/MinisteriesOrPositions/services';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export class VolunteersReportStore {
    @observable loadList: boolean = false;
    @observable reportData: any[] = [];
    @observable cities: any = [];
    @observable ministeriesOrPositions: any = [];
    @observable cityIds?: any = [{ key: 0, text: 'Todas', value: 0 }];
    @observable ministeriesOrPositionsIds?: any = [];
    @observable selectedCities?: any = [];
    @observable selectedMinisteries?: any = [];
    @observable selectedVolunteers?: any = [];

    handleChangeCitiesMultSelect(data: any) {
        this.selectedCities = data;
    }

    handleChangeMinisteriesMultSelect(data: any) {
        this.selectedMinisteries = data;
    }

    @action
    async mountCityAndVolunteerSelects() {
        let { data: cities } = await getCitiesList({ offset: 0, limit: 20, filtered: 'regional=true' });
        let { data: ministeries } = await getMinistryOrPositionList({ offset: 0, limit: 100 });

        this.mountCitiesSelect(cities.content);
        this.mountMinisteriesOrPositionsSelect(ministeries.content);
    }

    @action
    async getReportData() {
        if (this.selectedCities.length > 0 && this.selectedMinisteries.length > 0) {
            let { data: response } = await getVolunteerReport(
                this.extractIds(this.selectedMinisteries, this.ministeriesOrPositions),
                this.extractIds(this.selectedCities, this.cities)
            );
            this.selectedVolunteers = response;
            this.reportData = transformReportData(response);
        }
    }

    /*     @action
        exportToPdf() {
            const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'portrait' });
            //doc.text("CAGEF - Lista de Voluntários", 35, 25);
            doc.setFontSize(12);
            doc.setLineWidth(4000);
            doc.table(1, 1, this.parseVolunteerData(), [{ name: 'Nome' }, { name: 'Cidade' }, { name: 'Ministerio' }, { name: 'DataNascimento' }],
                { autoSize: true });
            doc.save('report.pdf');
        } */

    @action
    exportToPdf() {
        const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'portrait' });

        doc.setFontStyle("Arial");
        doc.table(0, 0, this.parseVolunteerData(), this.getHeaders(),
            { autoSize: false, fontSize: 8, padding: 0, margins: 0 });
        doc.save('report.pdf');
    }

    private getHeaders() {
        return [
            { id: 'name', name: 'name', prompt: 'Nome', width: 60, align: 'left', padding: 0 },
            { id: 'city', name: 'city', prompt: 'Cidade', width: 50, align: 'left', padding: 0 },
            { id: 'ministery', name: 'ministery', prompt: 'Ministério', width: 45, align: 'left', padding: 0 },
            { id: 'district', name: 'district', prompt: "Comum", width: 25, align: 'left', padding: 0 },
            { id: 'phoneNumber', name: 'phoneNumber', prompt: 'Telefone', width: 25, align: 'left', padding: 0 },
            { id: 'celNumber', name: 'celNumber', prompt: 'Celular', width: 25, align: 'left', padding: 0 },
            { id: 'email', name: 'email', prompt: 'Email', width: 30, align: 'left', padding: 0 }
        ]
    }

    private parseVolunteerData() {
        return this.selectedVolunteers.map((volunteer: any) => {
            return {
                name: volunteer.name,
                city: volunteer.city || ' - ',
                ministery: volunteer.ministryOrPosition || ' - ',
                district: volunteer.prayingHouse || ' - ',
                phoneNumber: volunteer.phoneNumber || ' - ',
                celNumber: volunteer.celNumber || ' - ',
                email: volunteer.email || ' - '
            };
        });
    }

    private extractIds(selectedArray: any[], fullArray: any[]) {
        if (selectedArray.length == fullArray.length) {
            return;
        }
        return selectedArray.map(item => Number(item.value));
    }

    private mountCitiesSelect(cities: any[]) {
        this.cities = cities.map(city => {
            return {
                key: city.id,
                text: city.name,
                value: city.id
            }
        })
    }

    private mountMinisteriesOrPositionsSelect(ministeriesOrPositions: any[]) {
        this.ministeriesOrPositions = ministeriesOrPositions.map(ministeryOrPosition => {
            return {
                key: ministeryOrPosition.id,
                text: ministeryOrPosition.description,
                value: ministeryOrPosition.id
            }
        })
    }
}

export default new VolunteersReportStore();