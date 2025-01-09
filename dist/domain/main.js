"use strict";
const builder = new CalendarBuilder();
const defaultCalendar = builder.setCalendarName("default").setStartingYear(2024).build();
function calcTermDate() {
    const dateInput = document.getElementById("idNotificationDate");
    const date = dateInput.value.split("-");
    const categoryInput = document.getElementById("idCategory");
    const category = categoryInput.value;
    const termInput = document.getElementById("idTerm");
    const term = termInput.value;
    defaultCalendar.calculateDates(new Date(date[0], date[1] - 1, date[2]), category, parseInt(term));
}
