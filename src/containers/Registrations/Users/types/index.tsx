export class User {
    id: number;
    name: string;
    email: string;
    city: { id: number };
    role: string;

    constructor(id: number, name: string, email: string, city: number, role: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.city = { id: city };
        this.role = role;
    }
}