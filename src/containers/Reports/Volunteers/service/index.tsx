import magaRequest from "../../../../config/request";
import queryString from "query-string";
const basePath: string = '/volunteers/report';

export const getVolunteerReport = async (ministeriesOrPositionIds?: number[], cityIds?: number[]): Promise<any> => {
    return await magaRequest.get(
        `${process.env.REACT_APP_API_URL}${basePath}${parseQueryParams(ministeriesOrPositionIds, cityIds)}`
    );
}

const parseQueryParams = (ministeriesOrPositionIds?: number[], cityIds?: number[]) => {
    return (ministeriesOrPositionIds || cityIds) ?
        `?${queryString.stringify({
            ...(ministeriesOrPositionIds) && { 'ministryOrPosition.id': ministeriesOrPositionIds.join() },
            ...(cityIds) && { 'city.id': cityIds.join() }
        })}` : '';
}


