const builder = new CalendarBuilder();
const defaultCalendar = builder.setCalendarName("default").setStartingYear(2024).build();

// Manual changes
// console.log(defaultCalendar.getYears()[1]);
defaultCalendar.getYears()[1][179] = new Holiday(
    defaultCalendar.getYears()[1][179],
    "DÍA DEF. PÚBLICO"
);
defaultCalendar.getYears()[1][68] = new Holiday(
    defaultCalendar.getYears()[1][68],
    "DÍA INT. JUEZAS"
);

function calcTermDate() {
    const dateInput: any = document.getElementById("idNotificationDate");
    const date = dateInput.value.split("-");

    const categoryInput: any = document.getElementById("idCategory");
    const category: string = categoryInput.value;

    const termInput: any = document.getElementById("idTerm");
    const term = termInput.value;

    defaultCalendar.calculateDates(
        new Date(date[0], date[1] - 1, date[2]),
        category,
        parseInt(term)
    );
}