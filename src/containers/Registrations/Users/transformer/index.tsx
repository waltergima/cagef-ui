export const transform = (dataForm: any) => {
  dataForm.city = { id: dataForm.city };
  dataForm.password = dataForm.password ? Base64.encode(dataForm.password) : undefined;
  return dataForm;
}