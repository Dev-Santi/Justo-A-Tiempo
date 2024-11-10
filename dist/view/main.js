"use strict";
window.addEventListener("load", program);
const calendarState = { year: 0 };
let currentDatesCalculated;
function program() {
    // Menu behavior on mobile
    setReadyTheMobileNavigation();
    // Not done yet message
    setReadyToDisplayDevelopmentMessage();
    // Behavior of home calc date view
    setDefaultValueOnCalcDate();
    setTextInTermInput();
    // Calendar
    instanceHomeCalendar();
    readyToChangeMonth();
    setReadyTochangeYear();
    setReadyToCalcDate();
}
function setReadyTheMobileNavigation() {
    const menu = document.getElementById("idAsideMenu");
    const openMenuBtn = document.getElementById("idOpenMenuBtn");
    const closeMenuBtn = document.getElementById("idCloseMenuBtn");
    openMenuBtn.addEventListener("click", () => {
        menu.dataset.state = "1";
    });
    closeMenuBtn.addEventListener("click", () => {
        menu.dataset.state = "0";
    });
}
function setReadyToDisplayDevelopmentMessage() {
    const onDevelopmentElements = document.getElementsByClassName("development");
    const effectsContainer = document.getElementById("idEffectsContainer");
    for (let i = 0; i < onDevelopmentElements.length && effectsContainer; i++) {
        onDevelopmentElements[i].addEventListener("click", () => {
            const developMessage = document.createElement("div");
            const icon = document.createElement("img");
            icon.src = "./assets/icons/settings.svg";
            icon.alt = "Un ícono irrelevante";
            developMessage.innerText = "En desarrollo";
            developMessage.classList.add("development_message");
            developMessage.appendChild(icon);
            effectsContainer.appendChild(developMessage);
            setTimeout(() => {
                developMessage.remove();
            }, 4000);
        });
    }
}
function setDefaultValueOnCalcDate() {
    const input = document.getElementById("idNotificationDate");
    const date = new Date().toLocaleDateString().split("/");
    const day = date[1].length < 2 ? "0" + date[1] : date[1];
    const month = date[0].length < 2 ? "0" + date[0] : date[0];
    input.value = date[2] + "-" + month + "-" + day;
}
function setTextInTermInput() {
    const termInput = document.getElementById("idTerm");
    const termText = document.getElementById("idTermText");
    updateTextInTermInput(termInput, termText);
    termInput.addEventListener("input", (e) => {
        updateTextInTermInput(termInput, termText);
    });
}
function updateTextInTermInput(termInput, termText) {
    const value = parseInt(termInput.value);
    if (value > 0 && value < 999) {
        termInput.value = value;
    }
    else {
        termInput.value = 0;
    }
    const length = (termInput.value + "").length;
    if (length > 2) {
        termText.className = "day_text ml_2";
    }
    else if (length > 1) {
        termText.className = "day_text ml_1";
    }
    else {
        termText.className = "day_text";
    }
    if (termInput.value == 1) {
        termText.textContent = "día";
    }
    else {
        termText.textContent = "días";
    }
}
function instanceHomeCalendar() {
    const today = getToday();
    const currentCalendar = today.split("/")[2] == "2024" ? calendar2024 : calendar2025;
    const daysContainer = document.getElementById("days");
    // Add spaces until get to first day
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const firstDay = currentCalendar.getDates()[today.split("/")[1] - 1][0].getName();
    for (let i = 0; i < days.length; i++) {
        if (firstDay == days[i]) {
            break;
        }
        daysContainer.appendChild(document.createElement("span"));
    }
    currentCalendar.getDates()[today.split("/")[1] - 1].forEach((day) => {
        const newDay = document.createElement("span");
        newDay.classList.add("day");
        if (day.getDate() == today) {
            newDay.classList.add("today");
        }
        if (day.isWeekend()) {
            newDay.classList.add("weekend");
        }
        newDay.textContent = day.getDay();
        daysContainer.appendChild(newDay);
    });
    const monthsContainer = document.getElementById("months");
    monthsContainer === null || monthsContainer === void 0 ? void 0 : monthsContainer.children[today.split("/")[1] - 1].classList.add("active");
    const yearLabel = document.getElementById("year_label");
    yearLabel.textContent = today.split("/")[2];
}
function readyToChangeMonth() {
    const monthsContainer = document.getElementById("months");
    for (let i = 0; i < monthsContainer.children.length; i++) {
        monthsContainer.children[i].addEventListener("click", () => {
            monthsContainer.children[i].classList.add("active");
            changeMonth(i);
        });
    }
}
function changeMonth(month) {
    const daysContainer = document.getElementById("days");
    const currentCalendar = calendars[calendarState.year];
    for (let i = daysContainer.children.length - 1; i >= 0; i--) {
        if (!daysContainer.children[i].className.includes("day_label")) {
            daysContainer.removeChild(daysContainer.children[i]);
        }
    }
    const monthsContainer = document.getElementById("months");
    for (let i = 0; i < monthsContainer.children.length; i++) {
        monthsContainer.children[i].classList.remove("active");
    }
    monthsContainer.children[month].classList.add("active");
    // Add spaces until get to first day
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const firstDay = currentCalendar.getDates()[month][0].getName();
    for (let i = 0; i < days.length; i++) {
        if (firstDay == days[i]) {
            break;
        }
        daysContainer.appendChild(document.createElement("span"));
    }
    let startedToPaintDates = false;
    currentCalendar.getDates()[month].forEach((day) => {
        const newDay = document.createElement("span");
        newDay.classList.add("day");
        if (day.getDate() == getToday()) {
            newDay.classList.add("today");
        }
        if (day.isWeekend()) {
            newDay.classList.add("weekend");
        }
        for (let i = 0; i < currentDatesCalculated.length; i++) {
            if (currentDatesCalculated[i].getDate() == day.getDate()) {
                startedToPaintDates = true;
                newDay.classList.add("dateCalculated");
                if (i == currentDatesCalculated.length - 1) {
                    newDay.classList.add("finalDateCalculated");
                    startedToPaintDates = false;
                }
            }
        }
        if (startedToPaintDates && !newDay.classList.contains("dateCalculated")) {
            newDay.classList.add("dateSkipped");
        }
        newDay.textContent = day.getDay();
        daysContainer.appendChild(newDay);
    });
}
function setReadyTochangeYear() {
    const yearLeft = document.getElementById("year_left");
    const yearRight = document.getElementById("year_right");
    yearLeft === null || yearLeft === void 0 ? void 0 : yearLeft.addEventListener("click", () => {
        if (calendarState.year != 0) {
            calendarState.year--;
            changeMonth(11);
            const yearLabel = document.getElementById("year_label");
            yearLabel.textContent = calendars[calendarState.year].getYear();
        }
    });
    yearRight === null || yearRight === void 0 ? void 0 : yearRight.addEventListener("click", () => {
        if (calendarState.year != calendars.length - 1) {
            calendarState.year++;
            changeMonth(0);
            const yearLabel = document.getElementById("year_label");
            yearLabel.textContent = calendars[calendarState.year].getYear();
        }
    });
}
function setReadyToCalcDate() {
    const notificationDateElement = document.getElementById("idNotificationDate");
    const categoryElement = document.getElementById("idCategory");
    const termElement = document.getElementById("idTerm");
    const calcBtnElement = document.getElementById("idCalcDateBtn");
    calcBtnElement === null || calcBtnElement === void 0 ? void 0 : calcBtnElement.addEventListener("click", (e) => {
        e.preventDefault();
        const notificationDate = notificationDateElement.value;
        const category = categoryElement.value;
        const term = termElement.value;
        if (notificationDate.length < 10) {
            alert("Fecha de notificación inválida");
        }
        if (term <= 0) {
            alert("El plazo debe ser mayor a cero");
            return;
        }
        let dateParsed = notificationDate.split("-");
        const date = dateParsed[2] + "/" + dateParsed[1] + "/" + dateParsed[0];
        const datesResult = calcDate(date, category, term);
        currentDatesCalculated = datesResult;
        const calcResultInPage = document.getElementById("calcResultDate");
        calcResultInPage.textContent = datesResult[datesResult.length - 1].getDate();
        const animation = document.getElementById("calcResult");
        animation === null || animation === void 0 ? void 0 : animation.classList.toggle("playAnimation");
        !(animation === null || animation === void 0 ? void 0 : animation.classList.contains("green")) && (animation === null || animation === void 0 ? void 0 : animation.classList.add("green"));
        setTimeout(() => animation === null || animation === void 0 ? void 0 : animation.classList.toggle("playAnimation"), 320);
        changeMonth(parseInt(dateParsed[1]) - 1);
    });
}
function reloadFromCalcDate() {
    for (let i = 0; i < calendars[0].getDates().length; i++) {
        for (let j = 0; j < calendars[0].getDates()[i].length; j++) {
        }
    }
    for (let i = 0; i < calendars[1].getDates().length; i++) {
        for (let j = 0; j < calendars[1].getDates()[i].length; j++) {
        }
    }
}
function getToday() {
    return new Date().toLocaleDateString("es-UY", { day: "2-digit", month: "2-digit", year: "numeric" });
}
