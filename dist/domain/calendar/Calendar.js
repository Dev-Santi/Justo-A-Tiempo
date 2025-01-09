"use strict";
class Calendar {
    constructor(name, years) {
        this.name = name;
        this.years = years;
        this.state = {
            currentPage: [],
            calculatedDays: [],
            nextHasCalculatedDates: false,
            previousHasCalculatedDates: false,
        };
    }
    getName() {
        return this.name;
    }
    getYears() {
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
    goToMonth(month) {
        let end = false;
        const newPage = [];
        for (let i = 0; i < this.getYears().length && !end; i++) {
            for (let j = 0; j < this.getYears()[i].length && !end; j++) {
                const day = this.getYears()[i][j];
                if (day.getDate().getFullYear() ==
                    this.state.currentPage[0].getDate().getFullYear() &&
                    day.getDate().getMonth() == month) {
                    newPage.push(day);
                }
                else if (newPage.length > 0) {
                    end = true;
                }
            }
        }
        this.setCurrentPage(newPage);
    }
    goToYear(year) {
        let end = false;
        const page = [];
        for (let i = 0; i < this.getYears().length && !end; i++) {
            for (let j = 0; j < this.getYears()[i].length && !end; j++) {
                const day = this.getYears()[i][j];
                if (year == day.getDate().getFullYear() &&
                    this.state.currentPage[0].getDate().getMonth() == day.getDate().getMonth()) {
                    page.push(this.getYears()[i][j]);
                }
                else if (page.length > 0) {
                    end = true;
                }
            }
        }
        this.setCurrentPage(page);
    }
    setCurrentPage(page) {
        this.state.currentPage = page;
    }
    getDefaulPage(date) {
        let today = date ? date : new Date();
        let end = false;
        const page = [];
        for (let i = 0; i < this.getYears().length && !end; i++) {
            for (let j = 0; j < this.getYears()[i].length && !end; j++) {
                const day = this.getYears()[i][j];
                if (today.getFullYear() == day.getDate().getFullYear() &&
                    today.getMonth() == day.getDate().getMonth()) {
                    load;
                    page.push(this.getYears()[i][j]);
                }
                else if (page.length > 0) {
                    end = true;
                }
            }
        }
        return page;
    }
    calculateDates(date, category, term) {
        this.state.calculatedDays = [];
        let count = term;
        let found = false;
        for (let i = 0; i < this.getYears().length && count > 0; i++) {
            for (let j = 0; j < this.getYears()[i].length && count > 0; j++) {
                const currentDay = this.getYears()[i][j].getDate().toDateString();
                if (found) {
                    // Filters
                    if ((category == "0" || category == "1") && this.getYears()[i][j].getDescription().length == 0 && !["Sábado", "Domingo"].includes(this.getYears()[i][j].getName())) {
                        count -= 1;
                        this.state.calculatedDays.push(this.getYears()[i][j]);
                    }
                    if (category == "2") {
                        count -= 1;
                        this.state.calculatedDays.push(this.getYears()[i][j]);
                    }
                }
                if (currentDay == date.toDateString()) {
                    found = true;
                }
            }
        }
        console.log(this.state.calculatedDays);
    }
    // Only for test
    setTestState(y, m, d) {
        this.setCurrentPage(this.getDefaulPage(new Date(y, m, d)));
    }
}
