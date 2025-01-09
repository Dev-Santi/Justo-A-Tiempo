const testBuilder = new CalendarBuilder();
const testCalendar = testBuilder.setCalendarName("test").setStartingYear(2022).build();
console.log(testCalendar.getYears());

function testCarnaval() {
    const carnavalDates = [
        "15/02/2021",
        "16/02/2021",
        "28/02/2022",
        "01/03/2022",
        "20/02/2023",
        "21/02/2023",
        "12/02/2024",
        "13/02/2024",
    ];
    for (const calendar of testCalendar.getYears()) {
        for (const day of calendar) {
            if (carnavalDates.includes(day.getStringDate())) {
                if (!(day instanceof Holiday && day.getDescription() == "Carnaval")) {
                    throw new Error("Carnaval not found in: " + day.getDate());
                }
            }
        }
    }
}
testCarnaval();

function testTurismo() {
    const turismoDates = [
        "04/04/2021",
        "17/04/2022",
        "09/04/2023",
        "31/03/2024"
    ];
    for (const calendar of testCalendar.getYears()) {
        for (const day of calendar) {
            if (turismoDates.includes(day.getStringDate())) {
                if (!(day instanceof Holiday && day.getDescription() == "Domingo de Pascua")) {
                    throw new Error("Easter sunday not found in: " + day.getDate());
                }
            }
        }
    }
}
testTurismo();
