window.addEventListener("load", program);

function program() {
    // Menu behavior on mobile
    setReadyTheMobileNavigation();
    setReadyToDisplayDevelopmentMessage();
    setDefaultValueOnCalcDate();
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
            icon.alt = "Si";

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
