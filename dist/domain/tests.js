"use strict";
const calendarBuilder = new CalendarBuilder();
const calendar2023 = calendarBuilder
    .setYear("2023")
    .setIsLeapYear(false)
    .setFirstDayName("Martes")
    .build();
calendar2023.addHoliday("04/03/2023", 2, "Feria Judicial");
