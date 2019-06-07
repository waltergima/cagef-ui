export class InnerObject {
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}

export class SelectItem {
    key: number;
    text: string;
    value: number;

    constructor(key: number, text: string, value: number) {
        this.key = key;
        this.text = text;
        this.value = value;
    }
}