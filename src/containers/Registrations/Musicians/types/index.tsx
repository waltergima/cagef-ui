import { Volunteer } from "../../Volunteers/types";

export class Musician extends Volunteer {
    instrument: Instrument;
    oficializationDate?: string;
    rehearsalDate?: string;
    rjmExamDate?: string;
    oficialCultExamDate?: string;
    observation?: string;

    constructor(id: number, name: string, address: string, district: string, city: number, zipCode: string, phoneNumber: string,
        celNumber: string, email: string, dateOfBirth: Date, naturalness: number, dateOfBaptism: Date, cpf: string, rg: string,
        maritalStatus: string, ministryApresentationDate: Date, promise: string, reportCode: string, ministryOrPosition: number[],
        instrument: number, oficializationDate: Date, rehearsalDate: Date, rjmExamDate: Date, oficialCultExamDate: Date, observation: string) {
        super(id, name, address, district, city, zipCode, phoneNumber, celNumber, email, dateOfBirth, naturalness, dateOfBaptism, cpf, rg, maritalStatus, ministryApresentationDate, promise, reportCode, ministryOrPosition);
        this.instrument = { id: instrument }
        this.oficializationDate = oficializationDate ? oficializationDate.toLocaleDateString() : undefined;
        this.rehearsalDate = rehearsalDate ? rehearsalDate.toLocaleDateString() : undefined;
        this.rjmExamDate = rjmExamDate ? rjmExamDate.toLocaleDateString() : undefined;
        this.oficialCultExamDate = oficialCultExamDate ? oficialCultExamDate.toLocaleDateString() : undefined;
        this.observation = observation || undefined;
    }
}

export interface Instrument {
    id: number;
    description?: string;
}