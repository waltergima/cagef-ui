import { City } from "../../Registrations/Cities/types";

export class LoginRequest {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class LoginResponse {
    email: string;
    city: City;

    constructor(email: string, city: City) {
        this.email = email;
        this.city = city;
    }
}