import queryString from "query-string";
import { getSorted } from "maga-components";

export const parseParams = (value: any) => {
    let filtered: any = {};
    value.filtered.forEach((v: any) => {
        filtered[v.id] = v.value;
    });
    if (value.sorted && value.sorted.length) {
        filtered['orderBy'] = value.sorted[0].id;
        filtered['direction'] = value.sorted[0].desc ? 'desc' : 'asc';
    }
    const params = {
        offset: value.offset / value.limit,
        limit: value.limit,
        filtered: filtered ? queryString.stringify(filtered) : filtered
    };
    return params;
};