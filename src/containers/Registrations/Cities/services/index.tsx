import magaRequest from "../../../../config/request";
import { City } from "../../Cities/types";
const basePath: string = '/cities';

export const findAll = (params: any): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}?offset=${params.offset}&limit=${params.limit}${params.filtered ? '&' + params.filtered : ''}`
  );
}

export const findById = async (id: number): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`
  );
}

export const create = async (city: City): Promise<any> => {
  return magaRequest.post(
    `${process.env.REACT_APP_API_URL}${basePath}`,
    city
  );
}

export const update = async (city: City, id: number): Promise<any> => {
  return magaRequest.put(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`,
    city
  );
}

export const remove = async (id: number): Promise<any> => {
  return magaRequest.delete(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`
  );
}