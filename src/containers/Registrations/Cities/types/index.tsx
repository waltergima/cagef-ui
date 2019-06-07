export class City {
    id: number;
    name: string;
    state: string
    regional: boolean

    constructor(id: number, name: string, state: string, regional: boolean) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.regional = regional;
    }
}