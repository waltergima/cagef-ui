import magaRequest from "../../../../config/request";
import { MinistryOrPosition } from "../types";
const basePath: string = '/ministeriesOrPositions';

export const findAll = (params: any): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}?offset=${params.offset}&limit=${params.limit}${params.filtered ? '&' + params.filtered : ''}`
  );
}

export const create = (ministryOrPosition: MinistryOrPosition): Promise<any> => {
  return magaRequest.post(
    `${process.env.REACT_APP_API_URL}${basePath}`,
    ministryOrPosition
  );
}

export const update = (ministryOrPosition: MinistryOrPosition, id: number): Promise<any> => {
  return magaRequest.put(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`,
    ministryOrPosition
  );
}

export const remove = (id: number): Promise<any> => {
  return magaRequest.delete(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`
  );
}