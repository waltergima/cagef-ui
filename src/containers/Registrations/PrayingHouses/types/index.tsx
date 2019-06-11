import { InnerObject } from "../../types";

export class PrayingHouse {
    reportCode: string;
    district: string;
    city: InnerObject
    constructor(reportCode: string, district: string, city: InnerObject) {
        this.reportCode = reportCode;
        this.district = district;
        this.city = city;
    }
}