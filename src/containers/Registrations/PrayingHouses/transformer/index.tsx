export const transformPrayingHouse = (dataForm: any) => {
  dataForm.city = { id: dataForm.city.value || dataForm.city };
  return dataForm;
}