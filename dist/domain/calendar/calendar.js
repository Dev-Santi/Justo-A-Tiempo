"use strict";
class Calendar {
    constructor(aYear, newDates) {
        this.year = aYear;
        this.dates = newDates;
    }
    getYear() {
        return this.year;
    }
    getDates() {
        return this.dates;
    }
    addHoliday(date, type, description) {
        for (let i = 0; i < this.dates.length; i++) {
            for (let j = 0; j < this.dates[i].length; j++) {
                let curr = this.dates[i][j];
                if (curr.getDate() === date) {
                    this.dates[i][j] = new Holiday(curr.getName(), curr.getDate(), type, description);
                }
            }
        }
    }
    delHoliday(date) {
        for (let i = 0; i < this.dates.length; i++) {
            for (let j = 0; j < this.dates[i].length; j++) {
                let curr = this.dates[i][j];
                if (curr.getDate() === date) {
                    this.dates[i][j] = new Day(curr.getName(), curr.getDate());
                }
            }
        }
    }
}
class CalendarBuilder {
    constructor() {
        this.dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        this.year = "";
        this.dates = [];
        this.firstDayName = "";
        this.daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    setYear(aYear) {
        this.year = aYear;
        return this;
    }
    setIsLeapYear(isLeap) {
        if (isLeap) {
            this.daysPerMonth[1] = 29;
        }
        return this;
    }
    setFirstDayName(dayName) {
        this.firstDayName = dayName;
        return this;
    }
    build() {
        if (!this.year || !this.firstDayName) {
            throw new Error("Cannot build calendar without essential information.");
        }
        this.makeDates();
        return new Calendar(this.year, this.dates);
    }
    makeDates() {
        let currentDay = this.dayNames.indexOf(this.firstDayName);
        for (let i = 0; i < 12; i++) {
            let newMonth = [];
            const month = this.parseDate(i);
            for (let j = 0; j < this.daysPerMonth[i]; j++) {
                const day = this.parseDate(j);
                newMonth.push(new Day(this.dayNames[currentDay], day + "/" + month + "/" + this.year));
                currentDay++;
                if (currentDay > 6) {
                    currentDay = 0;
                }
            }
            this.dates.push(newMonth);
        }
    }
    parseDate(i) {
        return i + 1 < 10 ? "0" + (i + 1) : i + 1 + "";
    }
}
