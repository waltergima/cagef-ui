import magaRequest from "../../../config/request";
import { LoginRequest, LoginResponse } from "../types";
const basePath: string = '/login';

export const login = async (user: LoginRequest): Promise<any> => {
    return await magaRequest.post(
        `${process.env.REACT_APP_API_URL}${basePath}`,
        user
    );
}
