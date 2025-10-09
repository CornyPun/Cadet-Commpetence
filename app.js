const mainContainer = document.querySelector(".main-container");
const buttons = document.getElementsByClassName("button");
const wwSubjectContainers = document.getElementsByClassName("ww-subject-container");
const wwInfoContainers = {
    importantAnnouncements: document.querySelector(".ww-ia-info-container"),
    trainingOptionalActivities: document.querySelector(".ww-toa-info-container"),
    opportunitiesEvents: document.querySelector(".ww-oe-info-container"),
    branchFundraisers: document.querySelector(".ww-bf-info-container")
};

import {
    Message,
    Announcement,
    Event
} from "/classes.js"

// button name when clicked => [class name to remove to main container, class name to add]
//                              "null" bc can't be empty string         null to detect in logic
const wwButtonNamePrefixes = ["ww-ia", "ww-toa", "ww-oe", "ww-bf"];
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

const weeklyWatchMessages = {
    announcements: [
        {
            header: "Test Announcement",
            subheader: "Very Important",
            paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, odio amet numquam, similique tempora molestias vel aperiam atque alias, at possimus itaque? Recusandae blanditiis deserunt sunt ut itaque, voluptate exercitationem?",
            infoContainer: wwInfoContainers.importantAnnouncements
        }
    ],
    events: [
        {
            header: "Test Event",
            date: "6, 7 Oct",
            time: "0600hrs - 0700hrs",
            location: "Main Deck",
            uniform: "C1",
            paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, odio amet numquam, similique tempora molestias vel aperiam atque alias, at possimus itaque? Recusandae blanditiis deserunt sunt ut itaque, voluptate exercitationem?",
            infoContainer: wwInfoContainers.trainingOptionalActivities
        }
    ]
};

function initializeMessages() {
    for (const announcementInfo of weeklyWatchMessages.announcements) {
        const announcement = new Announcement(announcementInfo.header, announcementInfo.subheader, announcementInfo.paragraph);
        
        Message.display(announcement, announcementInfo.infoContainer);
    }

    for (const eventInfo of weeklyWatchMessages.events) {
        const event = new Event(eventInfo.header, eventInfo.date, eventInfo.time, eventInfo.location, eventInfo.uniform, eventInfo.paragraph);

        Message.display(event, eventInfo.infoContainer);
    }
}


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

initializeMessages();

for (const button of buttons) {
    button.addEventListener("mousedown", buttonMouseDown);
}