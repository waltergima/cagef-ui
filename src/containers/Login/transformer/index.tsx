import { Base64 } from "js-base64";
import { LoginRequest } from "../types";

export const transformUser = (user: LoginRequest): LoginRequest => {
    return new LoginRequest(user.username, Base64.encode(user.password));
}