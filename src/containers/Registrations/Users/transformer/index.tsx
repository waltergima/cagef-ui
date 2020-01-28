export const transform = (dataForm: any) => {
  dataForm.city = { id: dataForm.city.value };
  dataForm.role = dataForm.role.value;
  dataForm.password = dataForm.password ? Base64.encode(dataForm.password) : undefined;
  return dataForm;
}