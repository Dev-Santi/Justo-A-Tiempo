"use strict";
class Day {
    constructor(date) {
        this.description = "";
        this.date = date;
    }
    getName() {
        return ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][this.date.getDay()];
    }
    getDate() {
        return this.date;
    }
    getDescription() {
        return this.description;
    }
    getStringDate() {
        return this.date.toLocaleDateString("es-UY", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
}
class Holiday extends Day {
    constructor(day, description) {
        // test this
        super(day.getDate());
        this.description = description;
    }
    ;
}
