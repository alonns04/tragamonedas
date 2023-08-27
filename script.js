const spinDuration = 400; // milliseconds
const slotElements = document.querySelectorAll(".slot");
const spinButton = document.getElementById("spin-btn");

function getRandomSlotValue() {
    return Math.floor(Math.random() * 10).toString();
}

function spin() {
    spinButton.disabled = true;

    const targetValues = [getRandomSlotValue(), getRandomSlotValue(), getRandomSlotValue()];
    const startTimes = [Date.now(), Date.now(), Date.now()];

    function updateSlot(slotIndex) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTimes[slotIndex];

        if (elapsedTime < spinDuration) {
            const progress = elapsedTime / spinDuration;
            const randomIndex = Math.floor(Math.random() * 10);
            slotElements[slotIndex].textContent = randomIndex;
            requestAnimationFrame(() => updateSlot(slotIndex));
        } else {
            slotElements[slotIndex].textContent = targetValues[slotIndex];

            if (slotIndex === 2) {
                checkWin();
                spinButton.disabled = false;
            }
        }
    }

    for (let i = 0; i < slotElements.length; i++) {
        updateSlot(i);
    }
}

function checkWin() {
    if (
        slotElements[0].textContent === slotElements[1].textContent &&
        slotElements[1].textContent === slotElements[2].textContent
    ) {
        alert("¡Has ganado! Los tres coinciden!");
    } else if (
        slotElements[0].textContent === slotElements[1].textContent ||
        slotElements[1].textContent === slotElements[2].textContent ||
        slotElements[0].textContent === slotElements[2].textContent
    ) {
        alert("¡Has ganado! Coinciden dos slots!");
    }
}

spinButton.addEventListener("click", spin);
