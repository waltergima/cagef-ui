import { Musician } from "../types";

export const transformMusician = (dataForm: any) => {
  return new Musician(dataForm.id, dataForm.name, dataForm.address, dataForm.district, dataForm.city.value, dataForm.zipCode, dataForm.phoneNumber, dataForm.celNumber,
    dataForm.email, dataForm.dateOfBirth, dataForm.naturalness, dataForm.dateOfBaptism, dataForm.cpf, dataForm.rg, dataForm.maritalStatus, dataForm.ministryApresentationDate,
    dataForm.promise, dataForm.prayingHouse.value, dataForm.ministryOrPosition ? dataForm.ministryOrPosition.map((ministryOrPosition: any) => ministryOrPosition.id) : undefined,
    dataForm.instrument.value, dataForm.oficializationDate, dataForm.rehearsalDate, dataForm.rjmExamDate, dataForm.oficialCultExamDate, dataForm.observation);
}