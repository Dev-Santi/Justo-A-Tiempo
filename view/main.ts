window.addEventListener("load", program);

function program() {
    // Menu behavior on mobile
    setReadyTheMobileNavigation();
    setReadyToDisplayDevelopmentMessage();
}

function setReadyTheMobileNavigation() {
    const menu = document.getElementById("idAsideMenu");
    const openMenuBtn = document.getElementById("idOpenMenuBtn");
    const closeMenuBtn = document.getElementById("idCloseMenuBtn");

    if (!menu || !openMenuBtn || !closeMenuBtn) {
        throw new Error("No es posible acceder a los elementos de navegación.");
    }

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
