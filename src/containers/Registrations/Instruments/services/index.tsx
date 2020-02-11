import magaRequest from "../../../../config/request";
import { Instrument } from "../../Instruments/types";
const basePath: string = '/instruments';

export const findAll = (params: any): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}?offset=${params.offset}&limit=${params.limit}${params.filtered ? '&' + params.filtered : ''}`
  );
}

export const findAllCategories = (params: any): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}/categories?offset=${params.offset}&limit=${params.limit}${params.filtered ? '&' + params.filtered : ''}`
  );
}

export const findById = async (id: number): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`
  );
}

export const create = async (instrument: Instrument): Promise<any> => {
  return magaRequest.post(
    `${process.env.REACT_APP_API_URL}${basePath}`,
    instrument
  );
}

export const update = async (instrument: Instrument, id: number): Promise<any> => {
  return magaRequest.put(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`,
    instrument
  );
}

export const remove = async (id: number): Promise<any> => {
  return magaRequest.delete(
    `${process.env.REACT_APP_API_URL}${basePath}/${id}`
  );
}