export class Instrument {
    id: number;
    description: string;
    category: InstrumentCategory;

    constructor(id: number, description: string, category: number) {
        this.id = id;
        this.description = description;
        this.category = { id: category };
    }
}

export interface InstrumentCategory {
    id: number;
    description?: string;
}
