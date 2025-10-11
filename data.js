/*
Model of weeklyWatchMessages in JS

let weeklyWatchMessages = {
    "2025-10-13": {
        announcements: [
            {
                header: "Test Announcement",
                subheader: "Very Important",
                paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, odio amet numquam, similique tempora molestias vel aperiam atque alias, at possimus itaque? Recusandae blanditiis deserunt sunt ut itaque, voluptate exercitationem?",
                infoContainer: wwInfoContainers["importantAnnouncements"],
                anchors: [{
                    anchorLink: "https://www.youtube.com/",
                    anchorSubheader: "YouTube"
                }]
            }
        ],
        events: [
            {
                header: "Test Event",
                group: "All Phases",
                date: "6, 7 Oct",
                time: "0600hrs - 0700hrs",
                location: "Main Deck",
                uniform: "C1",
                paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, odio amet numquam, similique tempora molestias vel aperiam atque alias, at possimus itaque? Recusandae blanditiis deserunt sunt ut itaque, voluptate exercitationem?",
                infoContainer: wwInfoContainers["trainingOptionalActivities"]
            }
        ]
    }
};
*/

import {
    Message,
    Announcement,
    Event
} from "/classes.js"

const wwTopHeader = document.querySelector(".ww-top-header");
const wwTopSubheader = document.querySelector(".ww-top-subheader");
const wwInfoContainers = {
    importantAnnouncements: document.querySelector(".ww-ia-info-container"),
    trainingOptionalActivities: document.querySelector(".ww-toa-info-container"),
    opportunitiesEvents: document.querySelector(".ww-oe-info-container"),
    branchFundraisers: document.querySelector(".ww-bf-info-container")
};

const announcementDataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQObhzzwmhT1A_G5dhf6CncJI6fxbZ0uZl_zR-ygcpU7-HnnlBqeeVY3bWmHbotFFXjc43IIkYNaGEm/pub?output=tsv";
const announcementReleaseDateIndex = 0;
const announcementHeaderIndex = 1;
const announcementSubheaderIndex = 2;
const announcementParagraphIndex = 3;
const announcementInfoContainerIndex = 4;
const announcementAnchorLinkIndex = 5;

const eventDataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQObhzzwmhT1A_G5dhf6CncJI6fxbZ0uZl_zR-ygcpU7-HnnlBqeeVY3bWmHbotFFXjc43IIkYNaGEm/pub?gid=1822775767&single=true&output=tsv";
const eventReleaseDateIndex = 0;
const eventHeaderIndex = 1;
const eventGroupIndex = 2;
const eventDateIndex = 3;
const eventTimeIndex = 4;
const eventLocationIndex = 5;
const eventUniformIndex = 6;
const eventParagraphIndex = 7;
const eventInfoContainerIndex = 8;
const eventAnchorLinkIndex = 9;

const releaseTime = "08:00";
const localeDateStringOptions = { 
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
};
const localeTimeStringOptions = { 
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
};

const weeklyWatchMessages = {};

async function fetchData(uRL) {
    const response = await fetch(uRL);

    return response.text();
}

function parseData() {
    fetchData(announcementDataURL).then((data) => {
        data
            // splits text into an array of strings representing each line
            .split(/\r?\n/)
            
            // removes first string of array because it is just headers in the spreadsheet
            .filter((announcement, index) => index != 0)

            // splits each string (line) by their commas to create an array of the comma separated values as strings
            .map(announcement => announcement.split("\t"))

            // adds all the releaseDateStrings as keys in weeklyWatchMessages and adds the message to the following release date
            .forEach(announcement => {
                const releaseDateString = announcement[announcementReleaseDateIndex];

                if (Object.keys(weeklyWatchMessages).includes(releaseDateString) == false) {
                    weeklyWatchMessages[releaseDateString] = {
                        announcements: [],
                        events: []
                    };
                }

                const releaseDateDictionary = weeklyWatchMessages[releaseDateString];
                const anchorsArray = [];

                for (let i = announcementAnchorLinkIndex; i < announcement.length; i += 2) {
                    const link = announcement[i];
                    const subheader = announcement[i + 1];

                    // !!() returns a boolean representing if the elements within the brackets exist
                    if (!!(link && subheader)) {
                        anchorsArray.push({
                            anchorLink: link,
                            anchorSubheader: subheader
                        })
                    }
                }

                releaseDateDictionary.announcements.push({
                    header: announcement[announcementHeaderIndex],
                    subheader: announcement[announcementSubheaderIndex],
                    paragraph: announcement[announcementParagraphIndex],
                    infoContainer: wwInfoContainers[announcement[announcementInfoContainerIndex]],
                    anchors: anchorsArray
                });
            });

        parseEventData();
    });
}

function parseEventData() {
    fetchData(eventDataURL).then((data) => {
        data
            // splits text into an array of strings representing each line
            .split(/\r?\n/)
            
            // removes first string of array because it is just headers in the spreadsheet
            .filter((event, index) => index != 0)

            // splits each string (line) by their commas to create an array of the comma separated values as strings
            .map(event => event.split("\t"))

            // adds all the releaseDateStrings as keys in weeklyWatchMessages and adds the message to the following release date
            .forEach(event => {
                const releaseDateString = event[eventReleaseDateIndex];

                if (Object.keys(weeklyWatchMessages).includes(releaseDateString) == false) {
                    weeklyWatchMessages[releaseDateString] = {
                        announcements: [],
                        events: []
                    };
                }

                const releaseDateDictionary = weeklyWatchMessages[releaseDateString];
                const anchorsArray = [];

                for (let i = eventAnchorLinkIndex; i < event.length; i += 2) {
                    const link = event[i];
                    const subheader = event[i + 1];

                    // !!() returns a boolean representing if the elements within the brackets exist
                    if (!!(link && subheader)) {
                        anchorsArray.push({
                            anchorLink: link,
                            anchorSubheader: subheader
                        })
                    }
                }

                releaseDateDictionary.events.push({
                    header: event[eventHeaderIndex],
                    group: event[eventGroupIndex],
                    date: event[eventDateIndex],
                    time: event[eventTimeIndex],
                    location: event[eventLocationIndex],
                    uniform: event[eventUniformIndex],
                    paragraph: event[eventParagraphIndex],
                    infoContainer: wwInfoContainers[event[eventInfoContainerIndex]],
                    anchors: anchorsArray
                });
            });

        createWeeklyWatch();
    });
}

function createWeeklyWatch() {
    const releaseDateString = Object.keys(weeklyWatchMessages).reduce((closestDateString, currentDateString) =>
        // if the current date is closer to today than the said "closest date",
        (new Date(`${currentDateString}T${releaseTime}`) < new Date() && new Date(`${currentDateString}T${releaseTime}`) > new Date(`${closestDateString}T${releaseTime}`)) ?
        currentDateString : // true : return the current date
        closestDateString// false : return the closest date
    );
    
    const announcements = weeklyWatchMessages[releaseDateString].announcements;
    const events = weeklyWatchMessages[releaseDateString].events;

    const releaseDate = new Date(`${releaseDateString}T${releaseTime}`);
    const weeklyWatchNumber = Object.keys(weeklyWatchMessages).length;
    const releaseLocaleDateString = releaseDate.toLocaleDateString(
        undefined, // uses locale time zone
        localeDateStringOptions
    );
    const releaseLocaleTimeString = releaseDate.toLocaleTimeString(
        [], // uses locale time zone
        localeTimeStringOptions
    ).replace(":", "") + "hrs";

    wwTopHeader.textContent = `Weekly Watch #${weeklyWatchNumber}`;
    wwTopSubheader.textContent = `${releaseLocaleDateString}, ${releaseLocaleTimeString}`;

    for (const announcementInfo of announcements) {
        const announcement = new Announcement(announcementInfo.header, announcementInfo.subheader, announcementInfo.paragraph, announcementInfo.anchors);
        
        Message.displayMessageInfoBox(announcement, announcementInfo.infoContainer);
    }

    for (const eventInfo of events) {
        const event = new Event(eventInfo.header, eventInfo.group, eventInfo.date, eventInfo.time, eventInfo.location, eventInfo.uniform, eventInfo.paragraph, eventInfo.anchors);

        Message.displayMessageInfoBox(event, eventInfo.infoContainer);
    }
}

parseData();