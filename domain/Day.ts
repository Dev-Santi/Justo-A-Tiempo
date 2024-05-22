class Day {
    private name: String;
    private date: String;

    constructor(name: String, date: String) {
        this.name = name;
        this.date = date;
    }

    getName(): String {
        return this.name;
    }

    getDate(): String {
        return this.date;
    }
}
