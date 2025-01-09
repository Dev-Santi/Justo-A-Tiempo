type state = {
    currentPage: Array<Day>;
    calculatedDays:Array<Day>;
    nextHasCalculatedDates: boolean;
    previousHasCalculatedDates: boolean;
};

class Calendar {
    private name: string;
    private years: Array<Array<Day>>;
    private state: state

    constructor(name: string, years: Array<Array<Day>>) {
        this.name = name;
        this.years = years;

        this.state = {
            currentPage: [],
            calculatedDays: [],
            nextHasCalculatedDates: false,
            previousHasCalculatedDates: false,
        };
    }

    getName(): string {
        return this.name;
    }

    getYears(): Array<Array<Day>> {
        return this.years;
    }

    getState() {
        if (this.state.currentPage.length == 0) {
            this.setCurrentPage(this.getDefaulPage());
        }

        return {
            currentPage: this.state.currentPage,
            calculatedDays: this.state.calculatedDays,
            nextHasCalculatedDates: this.state.nextHasCalculatedDates,
            previousHasCalculatedDates: this.state.previousHasCalculatedDates,
        };
    }

    resetState() {
        this.setCurrentPage(this.getDefaulPage());
        this.state.nextHasCalculatedDates = false;
        this.state.previousHasCalculatedDates = false;
    }

    goToMonth(month: number) {
        let end = false;
        const newPage: Array<Day> = [];

        for (let i = 0; i < this.getYears().length && !end; i++) {
            for (let j = 0; j < this.getYears()[i].length && !end; j++) {
                const day = this.getYears()[i][j];

                if (
                    day.getDate().getFullYear() ==
                        this.state.currentPage[0].getDate().getFullYear() &&
                    day.getDate().getMonth() == month
                ) {
                    newPage.push(day);
                } else if(newPage.length > 0) {
                    end = true;
                }
            }
        }

        this.setCurrentPage(newPage);
    }

    goToYear(year:number) {
        let end = false;
        const page: Array<Day> = [];

        for (let i = 0; i < this.getYears().length && !end; i++) {
            for (let j = 0; j < this.getYears()[i].length && !end; j++) {
                const day = this.getYears()[i][j];
                if (
                    year == day.getDate().getFullYear() &&
                    this.state.currentPage[0].getDate().getMonth() == day.getDate().getMonth()
                ) {
                    page.push(this.getYears()[i][j]);
                } else if (page.length > 0) {
                    end = true;
                }
            }
        }

        this.setCurrentPage(page)
    }

    private setCurrentPage(page: Array<Day>) {
        this.state.currentPage = page;
    }

    private getDefaulPage(date?: Date): Array<Day> {
        let today = date ? date : new Date();
        let end = false;
        const page: Array<Day> = [];

        for (let i = 0; i < this.getYears().length && !end; i++) {
            for (let j = 0; j < this.getYears()[i].length && !end; j++) {
                const day = this.getYears()[i][j];
                if (
                    today.getFullYear() == day.getDate().getFullYear() &&
                    today.getMonth() == day.getDate().getMonth()
                ) {load
                    page.push(this.getYears()[i][j]);
                } else if (page.length > 0) {
                    end = true;
                }
            }
        }

        return page;
    }

    calculateDates(date:Date,category:string,term:number) {
        this.state.calculatedDays = [];

        let count = term;
        let found = false;

        for (let i = 0; i < this.getYears().length && count > 0; i++) {
            for (let j = 0; j < this.getYears()[i].length && count > 0; j++) {
                const currentDay = this.getYears()[i][j].getDate().toDateString();

                if(found) {
                    // Filters
                    if((category == "0" || category == "1") && this.getYears()[i][j].getDescription().length == 0 && !["Sábado","Domingo"].includes(this.getYears()[i][j].getName())) {
                        count -= 1;
                        this.state.calculatedDays.push(this.getYears()[i][j]);
                    }

                    if(category == "2") {
                        count -= 1;
                        this.state.calculatedDays.push(this.getYears()[i][j]);
                    }
                }
                
                if(currentDay == date.toDateString()) {
                    found = true;
                }
            }
        }

        console.log(this.state.calculatedDays);
    }

    // Only for test
    setTestState(y: number, m: number, d: number) {
        this.setCurrentPage(this.getDefaulPage(new Date(y, m, d)));
    }
}
