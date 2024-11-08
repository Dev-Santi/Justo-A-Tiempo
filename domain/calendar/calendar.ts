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

    // Type 0 -> dia normal, type 1 -> feriado laborable, type 2 -> feriado no laborable, type 3 -> feria judicial
    addHoliday(date: String, type: number, description: String) {
        for (let i = 0; i < this.dates.length; i++) {
            for (let j = 0; j < this.dates[i].length; j++) {
                let curr = this.dates[i][j];

                if (curr.getDate() === date) {
                    const holiday = new Day(
                        curr.getName(),
                        curr.getDate()
                    );
                    holiday.setType(type);
                    holiday.setDescription(description)

                    this.dates[i][j] = holiday;
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
        const calendar = new Calendar(this.year, this.dates);

        this.year = "";
        this.dates = [];
        this.firstDayName = "";

        return calendar;
    }

    private makeDates() {
        let currentDay = this.dayNames.indexOf(this.firstDayName);

        for (let i = 0; i < 12; i++) {
            let newMonth: Array<Day> = [];
            const month = this.parseDate(i);

            for (let j = 0; j < this.daysPerMonth[i]; j++) {
                const day = this.parseDate(j);
                const newDay = new Day(this.dayNames[currentDay], day + "/" + month + "/" + this.year);

                // January all days are feria judicial
                if(i == 0) {
                    newDay.setType(3);
                    newDay.setDescription("Feria judicial")
                }

                newMonth.push(newDay);

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
