import { Volunteer } from "../../Volunteers/types";

export class Musician extends Volunteer {
    instrument: Instrument;
    oficializationDate: string;

    constructor(id: number, name: string, address: string, district: string, city: number, zipCode: string, phoneNumber: string, celNumber: string, email: string, dateOfBirth: Date, naturalness: number, dateOfBaptism: Date, cpf: string, rg: string, maritalStatus: string, ministryApresentationDate: Date, promise: string, reportCode: string, ministryOrPosition: number[], instrument: number, oficializationDate: Date) {
        super(id, name, address, district, city, zipCode, phoneNumber, celNumber, email, dateOfBirth, naturalness, dateOfBaptism, cpf, rg, maritalStatus, ministryApresentationDate, promise, reportCode, ministryOrPosition);
        this.instrument = { id: instrument }
        this.oficializationDate = oficializationDate ? oficializationDate.toLocaleDateString() : oficializationDate;
    }
}

export interface Instrument {
    id: number;
    description?: string;
}