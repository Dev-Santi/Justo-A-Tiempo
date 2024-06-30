"use strict";
const calendarBuilder = new CalendarBuilder();
const calendar2023 = calendarBuilder
    .setYear("2023")
    .setIsLeapYear(false)
    .setFirstDayName("Martes")
    .build();
console.log(calendar2023.getDates());
console.log();
