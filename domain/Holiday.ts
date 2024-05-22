class Holiday extends Day {
    private type: number;
    private description: String;

    constructor(name: String, date: String, type: number, description: String) {
        super(name, date);
        this.type = type;
        this.description = description;
    }

    getType(): number {
        return this.type;
    }

    getDescription(): String {
        return this.description;
    }
}
