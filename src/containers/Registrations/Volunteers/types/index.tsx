import { InnerObject } from "../../types";

export class Volunteer {
    id: number;
    name: string;
    address: string;
    district: string;
    city: InnerObject;
    zipCode: string;
    phoneNumber: string;
    celNumber: string;
    email: string;
    dateOfBirth: string;
    naturalness?: { id: number };
    dateOfBaptism: string;
    cpf: string;
    rg: string;
    maritalStatus: string;
    ministryApresentationDate: string;
    promise: string;
    prayingHouse: { reportCode: string };
    ministryOrPosition: { ids: number[] };

    constructor(id: number, name: string, address: string, district: string, city: number, zipCode: string, phoneNumber: string, celNumber: string, email: string, dateOfBirth: Date, naturalness: number, dateOfBaptism: Date, cpf: string, rg: string, maritalStatus: string, ministryApresentationDate: Date, promise: string, reportCode: string, ministryOrPosition: number[]) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.district = district;
        this.city = { id: city };
        this.zipCode = zipCode;
        this.phoneNumber = phoneNumber;
        this.celNumber = celNumber;
        this.email = email;
        this.dateOfBirth = dateOfBirth ? dateOfBirth.toLocaleDateString() : dateOfBirth;
        this.naturalness = naturalness ? { id: naturalness } : undefined;
        this.dateOfBaptism = dateOfBaptism ? dateOfBaptism.toLocaleDateString() : dateOfBaptism;;
        this.cpf = cpf;
        this.rg = rg;
        this.maritalStatus = maritalStatus;
        this.ministryApresentationDate = ministryApresentationDate ? ministryApresentationDate.toLocaleDateString() : ministryApresentationDate;
        this.promise = promise;
        this.prayingHouse = { reportCode: reportCode };
        this.ministryOrPosition = { ids: ministryOrPosition }
    }
}