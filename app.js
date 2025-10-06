const mainContainer = document.querySelector(".main-container");
const homeButtons = document.getElementsByClassName("home-button");

function homeButtonClick(event) {
    mainContainer.classList.add("main-container-2");

    const button = event.currentTarget;

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

function homeButtonMouseUp(event) {
    const button = event.currentTarget;

    button.classList.add("home-button-active-to-initial");

    setTimeout(() => {button.classList.remove("home-button-active-to-initial")}, 600);
}

for (const homeButton of homeButtons) {
    homeButton.addEventListener("click", homeButtonClick);
    homeButton.addEventListener("mouseup", homeButtonMouseUp);
}