import queryString from "query-string";

export const parseParams = (value: any) => {
    let filtered: any = {};
    value.filtered.forEach((v: any) => {
        filtered[v.id] = v.value;
    });
    const params = {
        offset: value.offset / value.limit,
        limit: value.limit,
        filtered: filtered ? queryString.stringify(filtered) : filtered
    };
    return params;
};