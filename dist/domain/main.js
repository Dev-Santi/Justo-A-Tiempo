"use strict";
const calendarBuilder = new CalendarBuilder();
const calendar2024 = calendarBuilder
    .setYear("2024")
    .setIsLeapYear(true)
    .setFirstDayName("Lunes")
    .build();
const calendar2025 = calendarBuilder
    .setYear("2025")
    .setIsLeapYear(false)
    .setFirstDayName("Martes")
    .build();
const calendars = [calendar2024, calendar2025];
function laboralFilter(day) {
    if (!day.isWeekend() && day.getType() == 0) {
        return day;
    }
}
function civilFilter(day) {
    if (day.getType() == 0) {
        return day;
    }
}
function calcDate(notiDate, category, days) {
    let found = false;
    const result = [];
    for (let i = 0; i < calendars[0].getDates().length && days > 0; i++) {
        for (let j = 0; j < calendars[0].getDates()[i].length && days > 0; j++) {
            if (notiDate == calendars[0].getDates()[i][j].getDate()) {
                found = true;
            }
            if (found) {
                if (category == 0) {
                    const filterResult = laboralFilter(calendars[0].getDates()[i][j]);
                    if (filterResult) {
                        result.push(filterResult);
                        days--;
                    }
                }
                else if (category > 0) {
                    const filterResult = civilFilter(calendars[0].getDates()[i][j]);
                    if (filterResult) {
                        result.push(filterResult);
                        days--;
                    }
                    if (days == 0 && !laboralFilter(calendars[0].getDates()[i][j])) {
                        days++;
                    }
                }
            }
        }
    }
    if (days > 0) {
        for (let i = 0; i < calendars[1].getDates().length && days > 0; i++) {
            for (let j = 0; j < calendars[1].getDates()[i].length && days > 0; j++) {
                if (notiDate == calendars[1].getDates()[i][j].getDate()) {
                    found = true;
                }
                if (found) {
                    if (category == 0) {
                        const filterResult = laboralFilter(calendars[1].getDates()[i][j]);
                        if (filterResult) {
                            result.push(filterResult);
                            days--;
                        }
                    }
                    else if (category > 0) {
                        const filterResult = civilFilter(calendars[1].getDates()[i][j]);
                        if (filterResult) {
                            result.push(filterResult);
                            days--;
                        }
                        if (days == 0 && !laboralFilter(calendars[1].getDates()[i][j])) {
                            days++;
                        }
                    }
                }
            }
        }
    }
    if (days > 0) {
        alert("La cantidad de días excede a la capacidad de los calendarios disponibles.");
        throw new Error("No se pudo calcular la cantidad de dias solictada porque se excede de los calendarios disponibles");
    }
    return result;
}
console.log(calcDate("01/02/2024", 0, 15));
console.log(calcDate("02/02/2025", 1, 15));
