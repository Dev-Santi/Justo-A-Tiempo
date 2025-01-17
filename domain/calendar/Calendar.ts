type state = {
    currentPage: Array<Day>;
    calculatedDays: Array<Day>;
    nextHasCalculatedDates: boolean;
    previousHasCalculatedDates: boolean;
};

class Calendar {
    private name: string;
    private years: Array<Array<Day>>;
    private state: state;

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
        this.state.calculatedDays = [];
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
                } else if (newPage.length > 0) {
                    end = true;
                }
            }
        }

        this.setCurrentPage(newPage);
    }

    goToYear(year: number) {
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

        this.setCurrentPage(page);
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
                ) {
                    page.push(this.getYears()[i][j]);
                } else if (page.length > 0) {
                    end = true;
                }
            }
        }

        return page;
    }

    calculateDates(date: Date, category: string, term: number) {
        this.state.calculatedDays = [];

        let count = term;
        let found = false;

        for (let i = 0; i < this.getYears().length && count > 0; i++) {
            for (let j = 0; j < this.getYears()[i].length && count > 0; j++) {
                const currentDay = this.getYears()[i][j].getDate().toDateString();

                if (found) {
                    // Filters
                    if (
                        category == "0" &&
                        this.getYears()[i][j].getDescription().length == 0 &&
                        !["Sábado", "Domingo"].includes(this.getYears()[i][j].getName())
                    ) {
                        count -= 1;
                        this.state.calculatedDays.push(this.getYears()[i][j]);
                    }

                    if (category == "1" && this.getYears()[i][j].getDescription().length == 0) {
                        if (
                            !(
                                ["Sábado", "Domingo"].includes(this.getYears()[i][j].getName()) &&
                                count == 1
                            )
                        ) {
                            count -= 1;
                        }

                        this.state.calculatedDays.push(this.getYears()[i][j]);
                    } else if (category == "2") {
                        const filters = [
                            document.getElementById("idFeriaCustomFilter")?.checked,
                            document.getElementById("idTurismoCustomFilter")?.checked,
                            document.getElementById("idCarnavalCustomFilter")?.checked,
                            document.getElementById("idFeriadoCustomFilter")?.checked,
                            document.getElementById("idFindeCustomFilter")?.checked,
                        ];

                        if (
                            this.getYears()[i][j].getDescription().includes("Feria") &&
                            filters[0]
                        ) {
                        } else if (
                            this.getYears()[i][j].getDescription().includes("Turismo") &&
                            filters[1]
                        ) {
                        } else if (
                            this.getYears()[i][j].getDescription().includes("Carnaval") &&
                            filters[2]
                        ) {
                        } else if (
                            this.getYears()[i][j].getDescription().length > 0 &&
                            !this.getYears()[i][j].getDescription().includes("Carnaval") &&
                            !this.getYears()[i][j].getDescription().includes("Turismo") &&
                            !this.getYears()[i][j].getDescription().includes("Feria") &&
                            filters[3]
                        ) {
                        } else if (
                            ["Sábado", "Domingo"].includes(this.getYears()[i][j].getName()) &&
                            filters[4]
                        ) {
                        } else {
                            count -= 1;
                            this.state.calculatedDays.push(this.getYears()[i][j]);
                        }
                    }
                }

                if (currentDay == date.toDateString()) {
                    found = true;
                }
            }
        }

        // navigate to first calculated day
        this.goToYear(this.getState().calculatedDays[0].getDate().getFullYear());
        this.goToMonth(this.getState().calculatedDays[0].getDate().getMonth());

        // update result date
        const resultElement: any = document.getElementById("calcResultDate");
        resultElement.textContent =
            this.getState().calculatedDays[
                this.getState().calculatedDays.length - 1
            ].getStringDate();

        // play animation
        resultElement.classList.toggle("play_green")
        setTimeout(()=> {
            resultElement.classList.toggle("play_green")
        }, 800)

        

        // add copy button
        const copyIcon = document.createElement("img");
        copyIcon.src = "./assets/icons/copy-svgrepo-com.svg";
        copyIcon.alt = "Botón para copiar";
        copyIcon.id = "idCopy";
        copyIcon.addEventListener("click", () => {
            navigator.clipboard.writeText(resultElement.textContent);
            copyIcon.classList.toggle("playAnimation");
            setTimeout(() => {
                copyIcon.classList.toggle("playAnimation");
            }, 400);
        });
        resultElement.appendChild(copyIcon);

        // add calendar button
        const calendarIcon = document.createElement("img");
        calendarIcon.src = "assets/icons/calendar-symbol-svgrepo-com.svg";
        calendarIcon.alt = "Botón para agendar";
        calendarIcon.id = "idCalendar";
        calendarIcon.addEventListener("click", () => {
            const date =
                this.getState().calculatedDays[this.getState().calculatedDays.length - 1].getDate();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes (0-11) + 1, con ceros a la izquierda
            const day = String(date.getDate()).padStart(2, "0");

            window.open(
                `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Vencimiento&dates=${year}${month}${day}/${year}${month}${day}`
            );
        });
        resultElement.appendChild(calendarIcon);

        resultElement.classList.add("withResult");
    }

    // Only for test
    setTestState(y: number, m: number, d: number) {
        this.setCurrentPage(this.getDefaulPage(new Date(y, m, d)));
    }
}
