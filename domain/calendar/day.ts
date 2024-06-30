class Day {
    private name: String;
    private date: String;

    constructor(aName: String, aDate: String) {
        this.name = aName;
        this.date = aDate;
    }

    getName() {
        return this.name;
    }

    getDate() {
        return this.date;
    }
}

class Holiday extends Day {
    private type: Number;
    private description: String;

    constructor(
        aName: String,
        aDate: String,
        aType: Number,
        aDescription: String
    ) {
        super(aName, aDate);
        this.type = aType;
        this.description = aDescription;
    }

    getType() {
        return this.type;
    }

    getDescription() {
        return this.description;
    }
}
