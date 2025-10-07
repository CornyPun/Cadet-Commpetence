const mainContainer = document.querySelector(".main-container");
const buttons = document.getElementsByClassName("button");

function buttonMouseDown(event) {
    const button = event.currentTarget;
    
    if (button.classList.contains("home-button")) {
        button.classList.add("home-button-pressed");
        mainContainer.classList.add("main-container-2");
    } else if (button.classList.contains("ww-button")) {
        button.classList.add("ww-button-pressed");
        mainContainer.classList.replace("main-container-2", "main-container-3")
    }

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

for (const button of buttons) {
    button.addEventListener("mousedown", buttonMouseDown);
}