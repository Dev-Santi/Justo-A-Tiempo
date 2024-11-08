window.addEventListener("load", program);

const calendarState = {year: 0}

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
    const menu: any = document.getElementById("idAsideMenu");
    const openMenuBtn: any = document.getElementById("idOpenMenuBtn");
    const closeMenuBtn: any = document.getElementById("idCloseMenuBtn");

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
    const input: any = document.getElementById("idNotificationDate");
    const date = new Date().toLocaleDateString().split("/");
    const day: string = date[1].length < 2 ? "0" + date[1] : date[1];
    const month: string = date[0].length < 2 ? "0" + date[0] : date[0];

    input.value = date[2] + "-" + month + "-" + day;
}

function setTextInTermInput() {
    const termInput: any = document.getElementById("idTerm");
    const termText: any = document.getElementById("idTermText");

    updateTextInTermInput(termInput, termText);
    termInput.addEventListener("input", (e: any) => {
        updateTextInTermInput(termInput, termText);
    });
}

function updateTextInTermInput(termInput: any, termText: any) {
    const value: number | typeof NaN = parseInt(termInput.value);

    if (value > 0 && value < 999) {
        termInput.value = value;
    } else {
        termInput.value = 0;
    }

    const length = (termInput.value + "").length;
    if (length > 2) {
        termText.className = "day_text ml_2";
    } else if (length > 1) {
        termText.className = "day_text ml_1";
    } else {
        termText.className = "day_text";
    }

    if (termInput.value == 1) {
        termText.textContent = "día";
    } else {
        termText.textContent = "días";
    }
}

function instanceHomeCalendar() {
    const today = getToday();
    const currentCalendar = today.split("/")[2] == "2024" ? calendar2024 : calendar2025
    const daysContainer: any = document.getElementById("days");

    // Add spaces until get to first day
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const firstDay = currentCalendar.getDates()[today.split("/")[1] - 1][0].getName();
    for (let i = 0; i < days.length; i++) {
        if(firstDay == days[i]) {
            break;
        }
        daysContainer.appendChild(document.createElement("span"))
    }

    currentCalendar.getDates()[today.split("/")[1] - 1].forEach((day) => {
        const newDay = document.createElement("span");
        newDay.classList.add("day")
        
        if(day.getDate() == today) {
            newDay.classList.add("today")
        }

        if(day.isWeekend()) {
            newDay.classList.add("weekend")
        }

        newDay.textContent = day.getDay();

        daysContainer.appendChild(newDay)
    })

    const monthsContainer = document.getElementById("months");
    monthsContainer?.children[today.split("/")[1] - 1].classList.add("active");

    const yearLabel:any = document.getElementById("year_label")
    yearLabel.textContent = today.split("/")[2];
}

function readyToChangeMonth() {
    const monthsContainer:any = document.getElementById("months");

    for (let i = 0; i < monthsContainer.children.length; i++) {
        monthsContainer.children[i].addEventListener("click",() => {
            monthsContainer.children[i].classList.add("active");
            changeMonth(i);
        })
    }
}

function changeMonth(month:number) {
    const daysContainer:any = document.getElementById("days");
    const currentCalendar = calendars[calendarState.year]
    

    for (let i = daysContainer.children.length -1 ; i >= 0; i--) {
        if(!daysContainer.children[i].className.includes("day_label")) {
            daysContainer.removeChild(daysContainer.children[i]);
        }
    }

    const monthsContainer:any = document.getElementById("months"); 
    for (let i = 0; i < monthsContainer.children.length; i++) {
        monthsContainer.children[i].classList.remove("active");
    }
    monthsContainer.children[month].classList.add("active");

    // Add spaces until get to first day
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const firstDay = currentCalendar.getDates()[month][0].getName();
    for (let i = 0; i < days.length; i++) {
        if(firstDay == days[i]) {
            break;
        }
        daysContainer.appendChild(document.createElement("span"))
    }

    currentCalendar.getDates()[month].forEach((day) => {
        const newDay = document.createElement("span");
        newDay.classList.add("day")
        
        if(day.getDate() == getToday()) {
            newDay.classList.add("today")
        }

        if(day.isWeekend()) {
            newDay.classList.add("weekend")
        }

        newDay.textContent = day.getDay();

        daysContainer.appendChild(newDay)
    })
}

function setReadyTochangeYear() {
    const yearLeft = document.getElementById("year_left")
    const yearRight = document.getElementById("year_right")

    yearLeft?.addEventListener("click",()=>{
        if(calendarState.year != 0) {
            calendarState.year--;
            changeMonth(11);
            const yearLabel:any = document.getElementById("year_label")
            yearLabel.textContent = calendars[calendarState.year].getYear();
        }
    })

    yearRight?.addEventListener("click",()=>{
        if(calendarState.year != calendars.length - 1) {
            calendarState.year++;
            changeMonth(0);
            const yearLabel:any = document.getElementById("year_label");
            yearLabel.textContent = calendars[calendarState.year].getYear();
        }
    })
}

function setReadyToCalcDate() {
    const notificationDateElement:any = document.getElementById("idNotificationDate");
    const categoryElement:any = document.getElementById("idCategory");
    const termElement:any = document.getElementById("idTerm");
    const calcBtnElement:any = document.getElementById("idCalcDateBtn");

    calcBtnElement?.addEventListener("click",(e:Event)=> {
        e.preventDefault();

        const notificationDate = notificationDateElement.value;
        const category = categoryElement.value;
        const term = termElement.value;

        if(notificationDate.length < 10) {
            alert("Fecha de notificación inválida");
        }
        console.log(term);
        
        if(term <= 0) {
            alert("El plazo debe ser mayor a cero");
        }
    })
}

function getToday():any {
    return new Date().toLocaleDateString("es-UY", {day:"2-digit",month: "2-digit", year: "numeric"});
}