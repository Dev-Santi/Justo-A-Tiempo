window.addEventListener("load", program);

function program() {
    // Menu behavior on mobile
    setReadyTheMobileNavigation();

    // Not done yet message
    setReadyToDisplayDevelopmentMessage();

    // Behavior of home calc date view
    setDefaultValueOnCalcDate();
    setTextInTermInput();

    //  Show custom filters when selected
    showCustomFiltersWhenSelected();

    // Patchs
    let width = window.innerWidth;
    let label: any = document.getElementById("idLabelNoti");
    if (width < 1024) {
        label.textContent = "Fecha:";
    } else {
        label.textContent = "Fecha de notificación:";
    }


    window.addEventListener("resize", () => {
        width = window.innerWidth;

        if (width < 1024) {
            label.textContent = "Fecha:";
        } else {
            label.textContent = "Fecha de notificación:";
        }
    });
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

function showCustomFiltersWhenSelected() {
    const options: any = document.getElementById("idCategory");
    const isSelected = options.value == 2;

    const filters: HTMLElement | null = document.getElementById("customFilters");
    const container: HTMLElement | null = document.getElementById("calcContentContainer");

    if (isSelected) {
        filters?.classList.add("active");
        container?.classList.add("active");
    }

    options.addEventListener("change", (e: any) => {
        const isSelected = options.value == 2;

        if (isSelected) {
            filters?.classList.add("active");
            container?.classList.add("active");
        } else {
            filters?.classList.remove("active");
            container?.classList.remove("active");
        }
    });
}
