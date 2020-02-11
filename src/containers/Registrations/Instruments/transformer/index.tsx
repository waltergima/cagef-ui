import { SelectItem } from "../../types";
import { InstrumentCategory } from "../types";

export const mountSelectValues = (categories: InstrumentCategory[]): SelectItem[] => {
    return categories.map((item) => {
        return new SelectItem(item.id, item.description!, item.id);
    });
};

export const transform = (dataForm: any) => {
    dataForm.category = dataForm.category.value;
    return dataForm;
}