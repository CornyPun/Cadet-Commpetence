const mainContainer = document.querySelector(".main-container");
const buttons = document.getElementsByClassName("button");

// button name when clicked => [class name to remove to main container, class name to add]
//                              "null" bc can't be empty string         null to detect in logic
const buttonNames = {
    "home-button": [
        "null",
        "main-container-2",
    ],
    "ww-button": [
        "main-container-2",
        "main-container-3"
    ],
    "back-button": [
        "null",
        null
    ],
    "ww-back-button": [
        "main-container-2",
        null
    ],
    "ww-subject-back-button": [
        "main-container-3",
        "main-container-2"
    ]
};
const oldMCName = 0;
const newMCName = 1;

let mainContainerTransitionDB = false;

function buttonMouseDown(event) {
    if (mainContainerTransitionDB === false) {
        const button = event.currentTarget;

        mainContainerTransitionDB = true;
        
        for (const [buttonName, mCNames] of Object.entries(buttonNames)) {
            const buttonPressedName = `${buttonName}-pressed`;
    
            if (button.classList.contains(buttonName)) {
                button.classList.add(buttonPressedName);
                mainContainer.classList.remove(mCNames[oldMCName]);
                if (mCNames[newMCName]) {
                    mainContainer.classList.add(mCNames[newMCName]);
                }
            }
            setTimeout(() => {
                button.classList.remove(buttonPressedName);
                mainContainerTransitionDB = false;
            }, 1200);
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
}

for (const button of buttons) {
    button.addEventListener("mousedown", buttonMouseDown);
}