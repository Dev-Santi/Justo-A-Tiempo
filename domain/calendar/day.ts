class Day {
    private name: String;
    private date: String;
    private type: number;
    private description: String;

    constructor(aName: String, aDate: String) {
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

    setType(aType:number) {
        this.type = aType;
    }

    getDescription() {
        return this.description;
    }

    setDescription(aDescription:String) {
        this.description = aDescription;
    }
}
