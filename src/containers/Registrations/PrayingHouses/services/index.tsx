import magaRequest from "../../../../config/request";
import { PrayingHouse } from "../types";
const basePath = '/prayinghouses';
export const findAll = (params: any): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}?offset=${params.offset}&limit=${params.limit}${params.filtered ? '&' + params.filtered : ''}`
  );
}

export const findByReportCode = (reportCode: string): Promise<any> => {
  return magaRequest.get(
    `${process.env.REACT_APP_API_URL}${basePath}/${reportCode}`
  );
}

export const create = (prayingHouse: PrayingHouse): Promise<any> => {
  return magaRequest.post(
    `${process.env.REACT_APP_API_URL}${basePath}`,
    prayingHouse
  );
}

export const update = async (prayingHouse: PrayingHouse, reportCode: string): Promise<any> => {
  return await magaRequest.put(
    `${process.env.REACT_APP_API_URL}${basePath}/${reportCode}`,
    prayingHouse
  );
}

export const remove = async (reportCode: string): Promise<any> => {
  return await magaRequest.delete(
    `${process.env.REACT_APP_API_URL}${basePath}/${reportCode}`
  );
}