// class CalendarManager {
//     -calendars : ArrayList<Calendar>

//     +CalendarManager()

//     +getCalendars() : ArrayList<Calendar>
//     +addCalendar(Calendar newCalendar) : void
//     +getCalendar(String year) : Calendar
//     +createCalendar(String year, String firstDay) : Calendar
//     +createLeapYearCalendar(String year, String firstDay) : Calendar
//     +addHolidaysToCalendar(Calendar calendar, Holiday[] holidays)

class CalendarManager {
    private calendars: Calendar[];
    private dayNames: String[] = [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
    ];

    constructor() {
        this.calendars = [];
    }

    getMonthsLength(isLeap?: boolean): Array<number> {
        if (isLeap) {
            return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    getDayName(i: number): String {
        if (i < 0 || i >= 7) {
            throw new Error('No se puede acceder al nombre de un dia que no existe.');
        }

        return this.dayNames[i];
    }

    getCalendars(): Calendar[] {
        return this.calendars;
    }

    addCalendar(calendar: Calendar): void {
        this.getCalendars().push(calendar);
    }

    hasCalendar(year: String): boolean {
        let found: boolean = false;
        for (let i = 0; i < this.getCalendars().length && !found; i++) {
            if (this.getCalendars()[i].getYear() == year) {
                found = true;
            }
        }
        return found;
    }

    getCalendar(year: String): Calendar {
        for (let i = 0; i < this.getCalendars().length; i++) {
            if (this.getCalendars()[i].getYear() == year) {
                return this.getCalendars()[i];
            }
        }

        throw new Error('El año buscado no existe en el calendario');
    }

    createCalendar(year: String, firstDay: number, isleapYear?: boolean): Calendar {
        let currentName: number = firstDay;
        let isLeap: boolean | undefined = isleapYear;

        const dates: Day[][] = this.createEmptyDates();

        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < this.getMonthsLength(isLeap)[i]; j++) {
                dates[i].push(
                    new Day(this.getDayName(currentName), this.dateToString(j, i, year))
                );
                currentName = this.getNextDay(currentName);
            }
        }

        return new Calendar(year, dates);
    }

    private createEmptyDates() {
        return [[], [], [], [], [], [], [], [], [], [], [], []];
    }

    private dateToString(day: number, month: number, year: String) {
        return '' + (day + 1) + '/' + (month + 1) + '/' + year;
    }

    private getNextDay(dayName: number): number {
        if (dayName < 6) {
            return dayName + 1;
        }
        return 0;
    }
}
