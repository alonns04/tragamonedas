const duracionGiro = 400; // milliseconds
const elementos = document.querySelectorAll(".slot");
const giroBoton = document.getElementById("spin-btn");

function obtenerAleatorios() {
    return Math.floor(Math.random() * 10).toString();
}

function giro() {
    giroBoton.disabled = true;

    const valores = [obtenerAleatorios(), obtenerAleatorios(), obtenerAleatorios()];
    const comienzo = [Date.now()];

    function updateSlot(slotIndex) {
        const ahora = Date.now();
        const tiempTrans = ahora - comienzo;
        if (tiempTrans < duracionGiro) {
            elementos[slotIndex].textContent = Math.floor(Math.random() * 10);
            requestAnimationFrame(() => updateSlot(slotIndex));
        } else {
            elementos[slotIndex].textContent = valores[slotIndex];

            if (slotIndex === 2) {
                ganaONo();
                giroBoton.disabled = false;
            }
        }
    }

    for (let i = 0; i < elementos.length; i++) {
        updateSlot(i);
    }
}

function ganaONo() {
    if (
        elementos[0].textContent === elementos[1].textContent &&
        elementos[1].textContent === elementos[2].textContent
    ) {
        alert("¡Has ganado! Los tres slots coinciden!");
    } else if (
        elementos[0].textContent === elementos[1].textContent ||
        elementos[1].textContent === elementos[2].textContent ||
        elementos[0].textContent === elementos[2].textContent
    ) {
        alert("¡Has ganado! Coinciden dos slots");
    }
}

giroBoton.addEventListener("click", giro);
