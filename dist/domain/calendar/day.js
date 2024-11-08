"use strict";
class Day {
    constructor(aName, aDate) {
        this.name = aName;
        this.date = aDate;
        this.type = 0;
        this.description = "";
    }
    getName() {
        return this.name;
    }
    getDate() {
        return this.date;
    }
    isWeekend() {
        return this.getName() == "Sábado" || this.getName() == "Domingo";
    }
    getDay() {
        return this.date.split("/")[0];
    }
    getType() {
        return this.type;
    }
    setType(aType) {
        this.type = aType;
    }
    getDescription() {
        return this.description;
    }
    setDescription(aDescription) {
        this.description = aDescription;
    }
}
