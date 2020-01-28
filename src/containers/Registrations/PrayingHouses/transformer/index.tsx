export const transformPrayingHouse = (dataForm: any) => {
  dataForm.city = { id: dataForm.city.value };
  return dataForm;
}