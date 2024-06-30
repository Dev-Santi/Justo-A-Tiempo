"use strict";
class Day {
    constructor(aName, aDate) {
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
    constructor(aName, aDate, aType, aDescription) {
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
