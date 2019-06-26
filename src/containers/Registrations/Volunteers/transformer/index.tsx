import { Volunteer } from "../types";

export const transformVolunteer = (dataForm: any) => {
  return new Volunteer(dataForm.id, dataForm.name, dataForm.address, dataForm.district, dataForm.city, dataForm.zipCode, dataForm.phoneNumber, dataForm.celNumber,
    dataForm.email, dataForm.dateOfBirth, dataForm.naturalness, dataForm.dateOfBaptism, dataForm.cpf, dataForm.rg, dataForm.maritalStatus, dataForm.ministryApresentationDate,
    dataForm.promise, dataForm.prayingHouse, dataForm.ministryOrPosition ? dataForm.ministryOrPosition.map((ministryOrPosition: any) => ministryOrPosition.id) : undefined);
}