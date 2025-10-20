const builder = new CalendarBuilder();
const defaultCalendar = builder
  .setCalendarName("default")
  .setStartingYear(2024)
  .build();

// Manual changes
// console.log(defaultCalendar.getYears()[1]);
defaultCalendar.getYears()[1][179] = new Holiday(
  defaultCalendar.getYears()[1][179],
  "Día Def. Público"
);
defaultCalendar.getYears()[1][68] = new Holiday(
  defaultCalendar.getYears()[1][68],
  "Día Int. Juezas"
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

  saveLastCalculatedDate(category, date, term);
}

function saveLastCalculatedDate(
  category: string,
  date: Array<string>,
  term: string
) {
  try {
    let inLocalStorage: any = localStorage.getItem("recent");

    if (inLocalStorage) {
      inLocalStorage = JSON.parse(inLocalStorage);
    } else {
      inLocalStorage = [];
    }

    inLocalStorage.unshift({
      category: category,
      date: date.join("-"),
      term: term,
      result: defaultCalendar
        .getState()
        .calculatedDays[
          defaultCalendar.getState().calculatedDays.length - 1
        ].getStringDate(),
    });

    if (inLocalStorage.length > 3) {
      inLocalStorage.splice(3);
    }

    localStorage.setItem("recent", JSON.stringify(inLocalStorage));
  } catch (e) {
    console.log(e);
  }
}
