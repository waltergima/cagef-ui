import magaRequest from "../../../../config/request";
import { Volunteer } from "../types";
const basePath: string = '/volunteers';

export const findAll = (params: any): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}?offset=${params.offset}&limit=${params.limit}${params.filtered ? '&' + params.filtered : ''}`
  );
}

export const create = (volunteer: Volunteer): Promise<any> => {
  return magaRequest.post(
    `${process.env.REACT_APP_API_URL}${basePath}`,
    volunteer
  );
}

export const update = (volunteer: Volunteer, id: number): Promise<any> => {
  return magaRequest.put(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`,
    volunteer
  );
}

export const remove = (id: number): Promise<any> => {
  return magaRequest.delete(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`
  );
}