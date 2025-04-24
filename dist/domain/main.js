"use strict";
const builder = new CalendarBuilder();
const defaultCalendar = builder.setCalendarName("default").setStartingYear(2024).build();
// Manual changes
console.log(defaultCalendar.getYears()[1]);
defaultCalendar.getYears()[1][179] = new Holiday(defaultCalendar.getYears()[1][179], "Día del defensor público");
function calcTermDate() {
    const dateInput = document.getElementById("idNotificationDate");
    const date = dateInput.value.split("-");
    const categoryInput = document.getElementById("idCategory");
    const category = categoryInput.value;
    const termInput = document.getElementById("idTerm");
    const term = termInput.value;
    defaultCalendar.calculateDates(new Date(date[0], date[1] - 1, date[2]), category, parseInt(term));
    window.scroll(0, 200);
}
