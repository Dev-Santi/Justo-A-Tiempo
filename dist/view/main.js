"use strict";
window.addEventListener("load", program);
function program() {
    // Menu behavior on mobile
    setReadyTheMobileNavigation();
    // Not done yet message
    setReadyToDisplayDevelopmentMessage();
    // Behavior of home calc date view
    setDefaultValueOnCalcDate();
    let lastTermValue = 15;
    setTextInTermInput(lastTermValue);
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
    const input = document.getElementById("idNotificationDate");
    const date = new Date().toLocaleDateString().split("/");
    const day = date[1].length < 2 ? "0" + date[1] : date[1];
    const month = date[0].length < 2 ? "0" + date[0] : date[0];
    input.value = date[2] + "-" + month + "-" + day;
}
function setTextInTermInput(lastTermValue) {
    const termInput = document.getElementById("idTerm");
    const termText = document.getElementById("idTermText");
    termInput.addEventListener("input", (e) => {
        const value = parseInt(termInput.value);
        if (value > 180 || value < 0) {
            termInput.value = lastTermValue;
        }
        else if (!value) {
            termInput.value = 0;
        }
        else {
            termInput.value = value;
        }
        lastTermValue = termInput.value;
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
    });
}
