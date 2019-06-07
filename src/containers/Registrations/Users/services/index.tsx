import magaRequest from "../../../../config/request";
import { User } from "../../Users/types";
const basePath: string = '/users';

export const findAll = async (params: any): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}?offset=${params.offset}&limit=${params.limit}${params.filtered ? '&' + params.filtered : ''}`
  );
}

export const findById = (id: number): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`
  );
}

export const create = (user: User): Promise<any> => {
  return magaRequest.post(
    `${process.env.REACT_APP_API_URL}${basePath}`,
    user
  );
}

export const update = (user: User, id: number): Promise<any> => {
  return magaRequest.put(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`,
    user
  );
}

export const remove = (id: number): Promise<any> => {
  return magaRequest.delete(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`
  );
}