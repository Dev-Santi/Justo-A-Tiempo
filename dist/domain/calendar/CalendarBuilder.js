"use strict";
const notStaticholidays = [
    {
        day: 19,
        month: 3,
        description: "Desembarco de los 33 Orientales",
    },
    {
        day: 12,
        month: 9,
        description: "Día de la Raza",
    },
    {
        day: 18,
        month: 4,
        description: "Batalla de las Piedras",
    },
];
class CalendarBuilder {
    constructor() {
        this.config = {
            startingYear: new Date().getFullYear(),
            name: "default",
        };
    }
    reset() {
        this.config = {
            startingYear: new Date().getFullYear(),
            name: "Default",
        };
    }
    setStartingYear(year) {
        this.config.startingYear = year;
        return this;
    }
    setCalendarName(name) {
        this.config.name = name;
        return this;
    }
    buildCalendar() {
        const currentDate = new Date(this.config.startingYear, 0, 1);
        const calendar = [];
        for (let i = this.config.startingYear; i < this.config.startingYear + 4; i++) {
            let currentYear = [];
            while (currentDate.getFullYear() === i) {
                currentYear.push(new Day(new Date(currentDate.getTime())));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            calendar.push(currentYear);
        }
        return calendar;
    }
    addNotStaticHolidays(calendar) {
        for (let i = 0; i < calendar.length; i++) {
            for (let j = 0; j < calendar[i].length; j++) {
                const date = calendar[i][j].getDate();
                for (let k = 0; k < notStaticholidays.length; k++) {
                    if (date.getMonth() == notStaticholidays[k].month &&
                        date.getDate() == notStaticholidays[k].day) {
                        switch (date.getDay()) {
                            case 2:
                                calendar[i][j - 1] = new Holiday(calendar[i][j - 1], notStaticholidays[k].description);
                                break;
                            case 3:
                                calendar[i][j - 2] = new Holiday(calendar[i][j - 2], notStaticholidays[k].description);
                                break;
                            case 4:
                                calendar[i][j + 4] = new Holiday(calendar[i][j + 4], notStaticholidays[k].description);
                                break;
                            case 5:
                                calendar[i][j + 3] = new Holiday(calendar[i][j + 3], notStaticholidays[k].description);
                                break;
                            default:
                                calendar[i][j] = new Holiday(calendar[i][j], notStaticholidays[k].description);
                                break;
                        }
                    }
                }
            }
        }
    }
    addStaticHolidays(calendar) {
        for (let i = 0; i < calendar.length; i++) {
            const easter = this.getEasterSunday(calendar[i][0].getDate().getFullYear());
            for (let j = 0; j < calendar[i].length; j++) {
                const day = calendar[i][j];
                const date = day.getDate();
                if (date.getMonth() == 0 || (date.getMonth() == 11 && date.getDate() >= 25)) {
                    calendar[i][j] = new Holiday(day, "Feria judicial mayor");
                }
                if (date.getMonth() == 6 && date.getDate() <= 15) {
                    calendar[i][j] = new Holiday(day, "Feria judicial menor");
                }
                if (date.getMonth() == 4 && date.getDate() == 1) {
                    calendar[i][j] = new Holiday(day, "Día del trabajador");
                }
                if (date.getMonth() == 5 && date.getDate() == 19) {
                    calendar[i][j] = new Holiday(day, "Natalicio de Artigas");
                }
                if (date.getMonth() == 6 && date.getDate() == 18) {
                    calendar[i][j] = new Holiday(day, "Jura de la Constitución");
                }
                if (date.getMonth() == 7 && date.getDate() == 25) {
                    calendar[i][j] = new Holiday(day, "Día de la Independencia");
                }
                if (date.getMonth() == 10 && date.getDate() == 2) {
                    calendar[i][j] = new Holiday(day, "Día de los Difuntos");
                }
                if (date.getMonth() == 11 && date.getDate() == 19) {
                    calendar[i][j] = new Holiday(day, "Día del Poder Judicial");
                }
                // Modify to ajust pascuas
                if (date.toDateString() == easter.toDateString()) {
                    for (let x = j; x > j - 7; x--) {
                        calendar[i][x - 1] = new Holiday(calendar[i][x - 1], "Semana de Turismo");
                    }
                    calendar[i][j - 48] = new Holiday(calendar[i][j - 48], "Carnaval");
                    calendar[i][j - 47] = new Holiday(calendar[i][j - 47], "Carnaval");
                }
            }
        }
    }
    // "Gauss method" to get easter sunday...
    getEasterSunday(year) {
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const mes = Math.floor((h + l - 7 * m + 114) / 31);
        const dia = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(year, mes - 1, dia);
    }
    build() {
        const newCalendar = this.buildCalendar();
        this.addNotStaticHolidays(newCalendar);
        this.addStaticHolidays(newCalendar);
        this.reset();
        return new Calendar(this.config.name, newCalendar);
    }
}
