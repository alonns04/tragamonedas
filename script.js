const duracionGiro = 400;
const elementos = document.querySelectorAll(".slot");
const giroBoton = document.getElementById("spin-btn");

function obtenerAleatorios() {
    return Math.floor(Math.random() * 10).toString();
}

function giro() {
    giroBoton.disabled = true;

    const valores = [obtenerAleatorios(), obtenerAleatorios(), obtenerAleatorios()];
    const comienzo = [Date.now()];

    function girarUnaVez(indice) {
        const ahora = Date.now();
        const tiempTrans = ahora - comienzo;
        if (tiempTrans < duracionGiro) {
            elementos[indice].textContent = Math.floor(Math.random() * 10);
            requestAnimationFrame(() => girarUnaVez(indice));
        } else {
            elementos[indice].textContent = valores[indice];
            if (indice === 2) {
                ganaONo();
                giroBoton.disabled = false;
            }
        }
    }

    for (let i = 0; i < elementos.length; i++) {
        girarUnaVez(i);
    }
}

function ganaONo() {
    if (
        elementos[0].textContent === elementos[1].textContent &&
        elementos[1].textContent === elementos[2].textContent
    ) {
        setTimeout(function() {
            alert("¡Has ganado! Los TRES(3) slots coinciden!")
        }, 1);        
    } else if (
        elementos[0].textContent === elementos[1].textContent ||
        elementos[1].textContent === elementos[2].textContent ||
        elementos[0].textContent === elementos[2].textContent
    ) {
        setTimeout(function() {
            alert("¡Has ganado! Los DOS(2) slots coinciden!")
        }, 1);        
    }
}

giroBoton.addEventListener("click", giro);
