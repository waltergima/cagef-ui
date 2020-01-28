import { Volunteer } from "../types";

export const transformVolunteer = (dataForm: any) => {
  return new Volunteer(dataForm.id, dataForm.name, dataForm.address, dataForm.district, dataForm.city.value, dataForm.zipCode, dataForm.phoneNumber, dataForm.celNumber,
    dataForm.email, dataForm.dateOfBirth, dataForm.naturalness && dataForm.naturalness.value, dataForm.dateOfBaptism, dataForm.cpf, dataForm.rg, dataForm.maritalStatus && dataForm.maritalStatus.value, dataForm.ministryApresentationDate,
    dataForm.promise && dataForm.promise.value, dataForm.prayingHouse && dataForm.prayingHouse.value, dataForm.ministryOrPosition ? dataForm.ministryOrPosition.map((ministryOrPosition: any) => ministryOrPosition.id) : undefined);
}