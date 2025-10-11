/* 
Model of announcement in HTML

<div class="ww-info-box">
    <h1 class="ww-info-box-header">Header</h1>
    <p class="ww-info-box-subheader">Subheader</p>
    <p class="ww-info-box-paragraph">
        Paragraph
    </p>
    <div class="ww-anchor-container">
        <a class="ww-anchor-link" href="https://www.link.com/">
            <div class="button ww-anchor">
                <img class="ww-anchor-icon">
                <p class="ww-anchor-subheader">Anchor</p>
            </div>
        </a>
    </div>
</div>

Model of event in HTML

<div class="ww-info-box">
    <h1 class="ww-info-box-header">Header</h1>
    <div class="ww-detail-container">
        <div class="ww-detail">
            <img class="ww-detail-icon" src="images/person.svg">
            <p class="ww-detail-paragraph">Group</p>
        </div>
        <div class="ww-detail">
            <img class="ww-detail-icon" src="images/calendar.svg">
            <p class="ww-detail-paragraph">Date</p>
        </div>
        <div class="ww-detail">
            <img class="ww-detail-icon" src="images/clock.svg">
            <p class="ww-detail-paragraph">Time</p>
        </div>
        <div class="ww-detail">
            <img class="ww-detail-icon" src="images/location.svg">
            <p class="ww-detail-paragraph">Location</p>
        </div>
        <div class="ww-detail">
            <img class="ww-detail-icon" src="images/shirt.svg">
            <p class="ww-detail-paragraph">Uniform</p>
        </div>
    </div>
    <p class="ww-info-box-paragraph">
        Paragraph
    </p>
    <div class="ww-anchor-container">
        <a class="ww-anchor-link" href="https://www.link.com/">
        <div class="button ww-anchor">
            <img class="ww-anchor-icon">
            <p class="ww-anchor-subheader">Anchor</p>
        </div>
        </a>
    </div>
</div>
*/

export class Message {
    #header;
    #paragraph;
    #anchors;

    constructor(h, p, a) {
        this.header = h;
        this.paragraph = p;
        this.anchors = a || this.anchors;
    }
    
    static createMessageInfoBox(message) {
        const infoBox = document.createElement("div");
        const infoBoxHeader = document.createElement("h1");
        const infoBoxParagraph = document.createElement("p");
        
        infoBox.classList.add("ww-info-box");
        infoBoxHeader.classList.add("ww-info-box-header");
        infoBoxParagraph.classList.add("ww-info-box-paragraph");
        
        infoBoxHeader.textContent = message.header;
        infoBoxParagraph.textContent = message.paragraph;

        infoBox.append(infoBoxHeader, infoBoxParagraph);

        return infoBox;
    }

    static createMessageAnchors(message) {
        const anchorContainer = document.createElement("div");
        anchorContainer.classList.add("ww-anchor-container");

        for (const anchor of message.anchors) {
            const anchorLink = document.createElement("a");
            const anchorButton = document.createElement("div");
            const anchorIcon = document.createElement("img");
            const anchorSubheader = document.createElement("p");

            anchorLink.classList.add("ww-anchor-link");
            //anchorLink.href = anchor.anchorLink;
            anchorButton.classList.add("button", "ww-anchor");
            anchorIcon.classList.add("ww-anchor-icon");
            anchorSubheader.classList.add("ww-anchor-subheader");
            anchorSubheader.textContent = anchor.anchorSubheader;

            anchorButton.append(anchorIcon, anchorSubheader);
            anchorLink.appendChild(anchorButton);
            anchorContainer.appendChild(anchorLink);
        }

        return anchorContainer;
    }

    static displayMessageInfoBox(message, infoContainer) {
        const infoBox = Message.createMessageInfoBox(message);
        const infoBoxParagraph = infoBox.querySelector(".ww-info-box-paragraph");

        if (message instanceof Announcement) {
            infoBox.insertBefore(Announcement.createAnnouncementElements(message), infoBoxParagraph);
        } else if (message instanceof Event) {
            infoBox.insertBefore(Event.createEventElements(message), infoBoxParagraph);
        }

        if (message.anchors) {
            infoBox.appendChild(Message.createMessageAnchors(message));
        }

        infoContainer.insertBefore(infoBox, infoContainer.querySelector(".gradient"));
    }

    get header() {
        return this.#header;
    }

    set header(h) {
        this.#header = h;
    }

    get paragraph() {
        return this.#paragraph;
    }

    set paragraph(p) {
        this.#paragraph = p;
    }

    get anchors() {
        return this.#anchors;
    }

    set anchors(a) {
        this.#anchors = a;
    }

    createAnchor(as, al) {
        this.anchors = this.anchors.push({
            anchorLink: al,
            anchorSubheader: as
        });
    }
}

export class Announcement extends Message {
    #subheader;

    constructor(h, sh, p, a) {
        super(h, p, a);
        this.subheader = sh;
    }

    static createAnnouncementElements(message) {
        const infoBoxSubheader = document.createElement("p");

        infoBoxSubheader.classList.add("ww-info-box-subheader");

        infoBoxSubheader.textContent = message.subheader;

        return infoBoxSubheader;
    }

    get subheader() {
        return this.#subheader;
    }

    set subheader(sh) {
        this.#subheader = sh;
    }
}

export class Event extends Message {
    #group;
    #date;
    #time;
    #location;
    #uniform;

    constructor(h, g, d, t, l, u, p, a) {
        super(h, p, a);
        this.group = g;
        this.date = d;
        this.time = t;
        this.location = l;
        this.uniform = u;
    }

    static get detailIcons() {
        return [
            "images/person.svg",
            "images/calendar.svg",
            "images/clock.svg",
            "images/location.svg",
            "images/shirt.svg"
        ];
    }

    static createEventElements(message) {
        const detailContainer = document.createElement("div");
        const detailValues = [
            message.group,
            message.date,
            message.time,
            message.location,
            message.uniform
        ];

        detailContainer.classList.add("ww-detail-container");
        
        for (let i = 0; i < detailValues.length; i++) {
            const detail = document.createElement("div");
            const detailIcon = document.createElement("img");
            const detailParagraph = document.createElement("p");

            detail.classList.add("ww-detail");
            detailIcon.classList.add("ww-detail-icon");
            detailParagraph.classList.add("ww-detail-paragraph");

            detailIcon.src = Event.detailIcons[i];
            detailParagraph.textContent = detailValues[i];

            detail.append(detailIcon, detailParagraph);
            detailContainer.appendChild(detail);
        }

        return detailContainer;
    }

    get group() {
        return this.#group;
    }

    set group(g) {
        this.#group = g;
    }

    get date() {
        return this.#date;
    }

    set date(d) {
        this.#date = d;
    }

    get time() {
        return this.#time;
    }

    set time(t) {
        this.#time = t;
    }

    get location() {
        return this.#location;
    }

    set location(l) {
        this.#location = l;
    }

    get uniform() {
        return this.#uniform;
    }

    set uniform(u) {
        this.#uniform = u;
    }
}