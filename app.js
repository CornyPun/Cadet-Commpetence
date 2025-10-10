const wwInfoContainers = {
    importantAnnouncements: document.querySelector(".ww-ia-info-container"),
    trainingOptionalActivities: document.querySelector(".ww-toa-info-container"),
    opportunitiesEvents: document.querySelector(".ww-oe-info-container"),
    branchFundraisers: document.querySelector(".ww-bf-info-container")
};

const mainContainer = document.querySelector(".main-container");
const buttons = document.getElementsByClassName("button");
const wwSubjectContainers = document.getElementsByClassName("ww-subject-container");

// button name when clicked => [class name to remove to main container, class name to add]
//                              "null" bc can't be empty string         null to detect in logic
const wwButtonNamePrefixes = ["ww-ia", "ww-toa", "ww-oe", "ww-bf"];
const navButtonNames = {
    "home-button": [
        "null",
        "main-container-2",
    ],
    "ww-button": [
        "main-container-2",
        "main-container-3"
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
const externalButtonNames = [
    "ww-anchor"
];
const oldMCName = 0;
const newMCName = 1;

let mainContainerTransitionDB = false;

function toggleContainerVisibilities(button) {
    if (button.classList.contains("ww-button")) {
        for (const wwButtonNamePrefix of wwButtonNamePrefixes) {
            if (button.classList.contains(`${wwButtonNamePrefix}-button`)) {
                for (const wwSubjectContainer of wwSubjectContainers) {
                    if (wwSubjectContainer == document.querySelector(`.${wwButtonNamePrefix}-container`)) {
                        wwSubjectContainer.classList.remove("ww-subject-container-hidden");
                    } else {
                        wwSubjectContainer.classList.add("ww-subject-container-hidden");
                    }
                }
                break;
            }
        }
    }  
}

function toggleButtonPressed(button) {
    let buttonPressedName;

    if (button.classList.contains("nav-button")) {
        for (const [buttonName, mCNames] of Object.entries(navButtonNames)) {
            if (button.classList.contains("back-button")) {
                buttonPressedName = "back-button-pressed";
            } else {
                buttonPressedName = `${buttonName}-pressed`;
            }

            if (button.classList.contains(buttonName)) {
                button.classList.add(buttonPressedName);
                mainContainer.classList.remove(mCNames[oldMCName]);
    
                // if a container to replace the old one exists, do so
                if (mCNames[newMCName]) {
                    mainContainer.classList.add(mCNames[newMCName]);
                }
                break;
            }
        }
    } else {
        for (const externalButtonName of externalButtonNames) {
            buttonPressedName = `${externalButtonName}-pressed`

            if (button.classList.contains(externalButtonName)) {
                button.classList.add(buttonPressedName);

                break;
            }
        }
    }

    setTimeout(() => {
        button.classList.remove(buttonPressedName);
        mainContainerTransitionDB = false;
    }, 1200);
}

function createRipple(event, button) {
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.getBoundingClientRect().left + radius)}px`;
    circle.style.top = `${event.clientY - (button.getBoundingClientRect().top + radius)}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

function buttonMouseDown(event) {
    if (mainContainerTransitionDB === false) {
        const button = event.currentTarget;

        mainContainerTransitionDB = true;
        
        toggleContainerVisibilities(button);
        toggleButtonPressed(button);
        createRipple(event, button);
    }
}

for (const button of buttons) {
    button.addEventListener("mousedown", buttonMouseDown);
}