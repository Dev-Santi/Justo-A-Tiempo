class Calendar {
    private year: String;
    private dates: Array<Array<Day>>;

    constructor(aYear: String, newDates: Array<Array<Day>>) {
        this.year = aYear;
        this.dates = newDates;
    }

    getYear() {
        return this.year;
    }

    getDates() {
        return this.dates;
    }

    addHoliday(date: String, type: Number, description: String) {
        for (let i = 0; i < this.dates.length; i++) {
            for (let j = 0; i < this.dates[i].length; i++) {}
        }
    }
}

class CalendarBuilder {
    private dayNames = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];

    private year: string;
    private dates: Array<Array<Day>>;
    private firstDayName: string;
    private daysPerMonth;

    constructor() {
        this.year = "";
        this.dates = [];
        this.firstDayName = "";
        this.daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    setYear(aYear: string) {
        this.year = aYear;
        return this;
    }

    setIsLeapYear(isLeap: Boolean) {
        if (isLeap) {
            this.daysPerMonth[1] = 29;
        }
        return this;
    }

    setFirstDayName(dayName: string) {
        this.firstDayName = dayName;
        return this;
    }

    build() {
        if (!this.year || !this.firstDayName) {
            throw new Error(
                "Cannot build calendar without essential information."
            );
        }

        this.makeDates();
        return new Calendar(this.year, this.dates);
    }

    private makeDates() {
        let currentDay = this.dayNames.indexOf(this.firstDayName);

        for (let i = 0; i < 12; i++) {
            let newMonth: Array<Day> = [];
            const month = i + 1 < 10 ? "0" + (i + 1) : i + 1 + "";

            for (let j = 0; j < this.daysPerMonth[i]; j++) {
                const day = j + 1 < 10 ? "0" + (j + 1) : j + 1 + "";
                newMonth.push(
                    new Day(
                        this.dayNames[currentDay],
                        day + "/" + month + "/" + this.year
                    )
                );

                currentDay++;
                if (currentDay > 6) {
                    currentDay = 0;
                }
            }

            this.dates.push(newMonth);
        }
    }
}
