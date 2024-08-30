class Calendar {
    private year: String;
    private dates: Array<Array<Day>>;

    constructor(aYear: String, newDates: Array<Array<Day>>) {
        this.year = aYear;
        this.dates = newDates;
    }

    getYear(): String {
        return this.year;
    }

    getDates(): Array<Array<Day>> {
        return this.dates;
    }

    addHoliday(date: String, type: Number, description: String) {
        for (let i = 0; i < this.dates.length; i++) {
            for (let j = 0; j < this.dates[i].length; j++) {
                let curr = this.dates[i][j];

                if (curr.getDate() === date) {
                    this.dates[i][j] = new Holiday(
                        curr.getName(),
                        curr.getDate(),
                        type,
                        description
                    );
                }
            }
        }
    }

    delHoliday(date: String) {
        for (let i = 0; i < this.dates.length; i++) {
            for (let j = 0; j < this.dates[i].length; j++) {
                let curr = this.dates[i][j];

                if (curr.getDate() === date) {
                    this.dates[i][j] = new Day(curr.getName(), curr.getDate());
                }
            }
        }
    }
}

class CalendarBuilder {
    private dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

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
            throw new Error("Cannot build calendar without essential information.");
        }

        this.makeDates();
        return new Calendar(this.year, this.dates);
    }

    private makeDates() {
        let currentDay = this.dayNames.indexOf(this.firstDayName);

        for (let i = 0; i < 12; i++) {
            let newMonth: Array<Day> = [];
            const month = this.parseDate(i);

            for (let j = 0; j < this.daysPerMonth[i]; j++) {
                const day = this.parseDate(j);
                newMonth.push(
                    new Day(this.dayNames[currentDay], day + "/" + month + "/" + this.year)
                );

                currentDay++;
                if (currentDay > 6) {
                    currentDay = 0;
                }
            }

            this.dates.push(newMonth);
        }
    }

    private parseDate(i: number) {
        return i + 1 < 10 ? "0" + (i + 1) : i + 1 + "";
    }
}
