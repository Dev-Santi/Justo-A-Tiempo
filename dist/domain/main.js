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
