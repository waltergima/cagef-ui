import { SelectItem } from "../../types";
import { City } from "../types";

export const mountSelectValues = (cities: City[]): SelectItem[] => {
    return cities.map((item) => {
        return new SelectItem(item.id, item.name + " - " + item.state, item.id);
    });
};

export const transform = (dataForm: any) => {
    dataForm.state = dataForm.state.value;
    return dataForm;
}