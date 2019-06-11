export const transformPrayingHouse = (dataForm: any) => {
  dataForm.city = { id: dataForm.city };
  return dataForm;
}