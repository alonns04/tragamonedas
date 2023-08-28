const duracionGiro = 400; // milliseconds
const slotElements = document.querySelectorAll(".slot");
const giroBoton = document.getElementById("spin-btn");

function obtenerAleatorios() {
    return Math.floor(Math.random() * 10).toString();
}

function spin() {
    giroBoton.disabled = true;

    const valores = [obtenerAleatorios(), obtenerAleatorios(), obtenerAleatorios()];
    const comienzo = [Date.now(), Date.now(), Date.now()];

    function updateSlot(slotIndex) {
        const ahora = Date.now();
        const tiempTrans = ahora - comienzo[slotIndex];

        if (tiempTrans < duracionGiro) {
            const randomIndex = Math.floor(Math.random() * 10);
            slotElements[slotIndex].textContent = randomIndex;
            requestAnimationFrame(() => updateSlot(slotIndex));
        } else {
            slotElements[slotIndex].textContent = valores[slotIndex];

            if (slotIndex === 2) {
                ganaONo();
                giroBoton.disabled = false;
            }
        }
    }

    for (let i = 0; i < slotElements.length; i++) {
        updateSlot(i);
    }
}

function ganaONo() {
    if (
        slotElements[0].textContent === slotElements[1].textContent &&
        slotElements[1].textContent === slotElements[2].textContent
    ) {
        alert("¡Has ganado! Los tres slots coinciden!");
    } else if (
        slotElements[0].textContent === slotElements[1].textContent ||
        slotElements[1].textContent === slotElements[2].textContent ||
        slotElements[0].textContent === slotElements[2].textContent
    ) {
        alert("¡Has ganado! Coinciden dos slots");
    }
}

giroBoton.addEventListener("click", spin);
