"use strict";
window.addEventListener("load", calendar);
function calendar() {
    var _a, _b;
    load();
    const months = (_a = document.getElementById("months")) === null || _a === void 0 ? void 0 : _a.children;
    for (let i = 0; i < months.length; i++) {
        months[i].addEventListener("click", (e) => {
            e.preventDefault();
            defaultCalendar.goToMonth(i);
            load();
        });
    }
    const yearRight = document.getElementById("year_right");
    const yearLeft = document.getElementById("year_left");
    yearRight === null || yearRight === void 0 ? void 0 : yearRight.addEventListener("click", (e) => {
        defaultCalendar.goToYear(defaultCalendar.getState().currentPage[0].getDate().getFullYear() + 1);
        load();
    });
    yearLeft === null || yearLeft === void 0 ? void 0 : yearLeft.addEventListener("click", (e) => {
        defaultCalendar.goToYear(defaultCalendar.getState().currentPage[0].getDate().getFullYear() - 1);
        load();
    });
    const calcButton = document.getElementById("idCalcDateBtn");
    calcButton.addEventListener("click", (e) => {
        e.preventDefault();
        calcTermDate();
        load();
    });
    (_b = document.getElementById("idCategory")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", (e) => {
        e.preventDefault();
        const categorySelect = document.getElementById("idCategory");
        const termContainer = document.getElementById("idTermContainer");
        const termElement = document.getElementById("idTerm");
        if (categorySelect.value == "0") {
            termElement.value = 15;
            setTextInTermInput();
        }
        else if (categorySelect.value == "1") {
            termElement.value = 30;
            setTextInTermInput();
        }
    });
    changeMonthLetters();
    changeView();
    window.addEventListener("resize", () => {
        changeMonthLetters();
        changeView();
    });
    function changeMonthLetters() {
        var _a;
        const a = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
        const b = [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
        ];
        const months = (_a = document.getElementById("months")) === null || _a === void 0 ? void 0 : _a.children;
        if (window.innerWidth < 1024) {
            for (let i = 0; i < months.length; i++) {
                months[i].textContent = a[i];
            }
        }
        else {
            for (let i = 0; i < months.length; i++) {
                months[i].textContent = b[i];
            }
        }
    }
    function changeView() {
        var _a, _b, _c, _d;
        const btn = document.getElementById("idCalcDateBtn");
        const result = document.getElementById("calcResult");
        if (window.innerWidth < 1024) {
            (_a = document.getElementById("calcContentContainer")) === null || _a === void 0 ? void 0 : _a.appendChild(btn);
            (_b = document.getElementById("calcContentContainer")) === null || _b === void 0 ? void 0 : _b.appendChild(result);
        }
        else {
            (_c = document.getElementById("idCalcDate")) === null || _c === void 0 ? void 0 : _c.appendChild(btn);
            (_d = document.getElementById("idCalcDate")) === null || _d === void 0 ? void 0 : _d.appendChild(result);
        }
    }
}
function load() {
    clear();
    const state = defaultCalendar.getState();
    loadPage(state);
    loadMonth(state);
    loadYear(state);
    addColorToMonthsWithCalculatedDays(state);
}
function loadPage(state) {
    let firstDay = 0 + state.currentPage[0].getDate().getDay();
    if (firstDay == 0) {
        firstDay = 7;
    }
    const daysContainer = document.getElementById("days");
    for (let i = 1; i < firstDay; i++) {
        const newDay = document.createElement("span");
        newDay.textContent = " ";
        daysContainer === null || daysContainer === void 0 ? void 0 : daysContainer.appendChild(newDay);
    }
    for (let i = 0; i < state.currentPage.length; i++) {
        const newDay = document.createElement("span");
        newDay.classList.add("day");
        newDay.textContent = "" + state.currentPage[i].getDate().getDate();
        const dayName = state.currentPage[i].getDate().toDateString().split(" ")[0];
        if (dayName == "Sun" || dayName == "Sat") {
            newDay.classList.add("weekend");
        }
        if (state.currentPage[i] instanceof Holiday) {
            const calendarInfo = document.getElementById("calendarInfo");
            const description = state.currentPage[i].getDescription();
            const square = description.includes("Feria") ? "judicial_square" : "holiday_square";
            newDay.addEventListener("mouseenter", (e) => {
                calendarInfo.innerHTML = `<span><span class="${square}"></span>${description}</span>`;
            });
            newDay.addEventListener("mouseleave", (e) => {
                calendarInfo.innerHTML = `<span><span class="judicial_square"></span>Feria Judicial</span>
                <span><span class="holiday_square"></span>Feriado</span>`;
            });
            if (state.currentPage[i].getDescription().includes("Feria judicial")) {
                newDay.classList.add("judicial");
            }
            else {
                newDay.classList.add("holiday");
            }
            if (state.currentPage[i].getDate().toDateString() == new Date().toDateString()) {
                newDay.classList.add("today");
            }
        }
        // Check if is calculated date
        for (let j = 0; j < state.calculatedDays.length; j++) {
            if (state.calculatedDays[j].getDate().getTime() ==
                state.currentPage[i].getDate().getTime()) {
                newDay.classList.add("calculated");
            }
        }
        daysContainer === null || daysContainer === void 0 ? void 0 : daysContainer.appendChild(newDay);
    }
}
function loadYear(state) {
    var _a, _b;
    const year = document.getElementById("yearLabel");
    year.textContent = state.currentPage[0].getDate().getFullYear();
    if (defaultCalendar
        .getYears()[defaultCalendar.getYears().length - 1][0].getDate()
        .getFullYear() == state.currentPage[0].getDate().getFullYear()) {
        (_a = document.getElementById("year_right")) === null || _a === void 0 ? void 0 : _a.classList.add("inactive");
    }
    else if (defaultCalendar.getYears()[0][0].getDate().getFullYear() ==
        state.currentPage[0].getDate().getFullYear()) {
        (_b = document.getElementById("year_left")) === null || _b === void 0 ? void 0 : _b.classList.add("inactive");
    }
}
function loadMonth(state) {
    var _a;
    (_a = document
        .getElementById("months")) === null || _a === void 0 ? void 0 : _a.children[state.currentPage[0].getDate().getMonth()].classList.add("active");
}
function addColorToMonthsWithCalculatedDays(state) {
    var _a;
    const children = (_a = document.getElementById("months")) === null || _a === void 0 ? void 0 : _a.children;
    const currentYear = state.currentPage[0].getDate().getFullYear();
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        let added = false;
        for (let j = 0; j < state.calculatedDays.length && !added; j++) {
            const day = state.calculatedDays[j];
            if (i == day.getDate().getMonth() && currentYear == day.getDate().getFullYear()) {
                child.classList.add("green_color");
                added = true;
            }
        }
    }
}
function clear() {
    var _a;
    const months = (_a = document.getElementById("months")) === null || _a === void 0 ? void 0 : _a.children;
    for (const m of months) {
        m.classList.remove("active");
        m.classList.remove("green_color");
    }
    const daysContainer = document.getElementById("days");
    daysContainer.innerHTML = "";
    const year = document.getElementById("yearLabel");
    year.innerHTML = "";
    const yearLeft = document.getElementById("year_left");
    yearLeft.className = "triangle";
    const yearRight = document.getElementById("year_right");
    yearRight.className = "triangle inverted";
}
