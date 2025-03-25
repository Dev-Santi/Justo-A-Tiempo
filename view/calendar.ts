window.addEventListener("load", calendar);

function calendar() {
    load();

    const months: any = document.getElementById("months")?.children;
    for (let i = 0; i < months.length; i++) {
        months[i].addEventListener("click", (e: Event) => {
            e.preventDefault();
            defaultCalendar.goToMonth(i);
            load();
        });
    }

    const yearRight = document.getElementById("year_right");
    const yearLeft = document.getElementById("year_left");

    yearRight?.addEventListener("click", (e) => {
        defaultCalendar.goToYear(
            defaultCalendar.getState().currentPage[0].getDate().getFullYear() + 1
        );
        load();
    });

    yearLeft?.addEventListener("click", (e) => {
        defaultCalendar.goToYear(
            defaultCalendar.getState().currentPage[0].getDate().getFullYear() - 1
        );
        load();
    });

    const calcButton: any = document.getElementById("idCalcDateBtn");
    calcButton.addEventListener("click", (e: Event) => {
        e.preventDefault();
        calcTermDate();

        load();
    });

    document.getElementById("idCategory")?.addEventListener("change", (e) => {
        e.preventDefault();

        const categorySelect: any = document.getElementById("idCategory");
        const termContainer: any = document.getElementById("idTermContainer");
        const termElement: any = document.getElementById("idTerm");

        if (categorySelect.value == "0") {
            termElement.value = 15;
            setTextInTermInput();
        } else if (categorySelect.value == "1") {
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

        const months: any = document.getElementById("months")?.children;

        if (window.innerWidth < 1024) {
            for (let i = 0; i < months.length; i++) {
                months[i].textContent = a[i];
            }
        } else {
            for (let i = 0; i < months.length; i++) {
                months[i].textContent = b[i];
            }
        }
    }

    function changeView() {
        const btn: any = document.getElementById("idCalcDateBtn");
        const result: any = document.getElementById("calcResult");

        if (window.innerWidth < 1024) {
            document.getElementById("calcContentContainer")?.appendChild(btn)
            document.getElementById("calcContentContainer")?.appendChild(result)
        } else {
            document.getElementById("idCalcDate")?.appendChild(btn)
            document.getElementById("idCalcDate")?.appendChild(result)
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

function loadPage(state: any) {
    let firstDay = 0 + state.currentPage[0].getDate().getDay();

    if (firstDay == 0) {
        firstDay = 7;
    }

    const daysContainer = document.getElementById("days");

    for (let i = 1; i < firstDay; i++) {
        const newDay = document.createElement("span");
        newDay.textContent = " ";
        daysContainer?.appendChild(newDay);
    }

    for (let i = 0; i < state.currentPage.length; i++) {
        const newDay = document.createElement("span");
        newDay.classList.add("day");
        newDay.textContent = "" + state.currentPage[i].getDate().getDate();

        if (state.currentPage[i] instanceof Holiday) {
            const calendarInfo: any = document.getElementById("calendarInfo");

            const description = state.currentPage[i].getDescription();
            const square = description.includes("Feria") ? "judicial_square" : "holiday_square";

            newDay.addEventListener("pointerenter", (e) => {
                calendarInfo.innerHTML = `<span><span class="${square}"></span>${description}</span>`;
            });

            newDay.addEventListener("pointerleave", (e) => {
                calendarInfo.innerHTML = `<span><span class="judicial_square"></span>Feria Judicial</span>
                <span><span class="holiday_square"></span>Feriado</span>`;
            });

            if (state.currentPage[i].getDescription().includes("Feria judicial")) {
                newDay.classList.add("judicial");
            } else {
                newDay.classList.add("holiday");
            }

            if (state.currentPage[i].getDate().toDateString() == new Date().toDateString()) {
                newDay.classList.add("today");
            }
        }

        // Check if is calculated date
        for (let j = 0; j < state.calculatedDays.length; j++) {
            if (
                state.calculatedDays[j].getDate().getTime() ==
                state.currentPage[i].getDate().getTime()
            ) {
                newDay.classList.add("calculated");
            }
        }

        daysContainer?.appendChild(newDay);
    }
}

function loadYear(state: state) {
    const year: any = document.getElementById("yearLabel");
    year.textContent = state.currentPage[0].getDate().getFullYear();

    if (
        defaultCalendar
            .getYears()
            [defaultCalendar.getYears().length - 1][0].getDate()
            .getFullYear() == state.currentPage[0].getDate().getFullYear()
    ) {
        document.getElementById("year_right")?.classList.add("inactive");
    } else if (
        defaultCalendar.getYears()[0][0].getDate().getFullYear() ==
        state.currentPage[0].getDate().getFullYear()
    ) {
        document.getElementById("year_left")?.classList.add("inactive");
    }
}

function loadMonth(state: state) {
    document
        .getElementById("months")
        ?.children[state.currentPage[0].getDate().getMonth()].classList.add("active");
}

function addColorToMonthsWithCalculatedDays(state: state) {
    const children: any = document.getElementById("months")?.children;
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
    const months: any = document.getElementById("months")?.children;
    for (const m of months) {
        m.classList.remove("active");
        m.classList.remove("green_color");
    }

    const daysContainer: any = document.getElementById("days");
    daysContainer.innerHTML = "";

    const year: any = document.getElementById("yearLabel");
    year.innerHTML = "";

    const yearLeft: any = document.getElementById("year_left");
    yearLeft.className = "triangle";

    const yearRight: any = document.getElementById("year_right");
    yearRight.className = "triangle inverted";
}
