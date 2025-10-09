const detailIcons = [
    "images/calendar.svg",
    "images/clock.svg",
    "images/location.svg",
    "images/shirt.svg"
];

export class Message {
    #header;
    #paragraph;

    constructor(h, p) {
        this.#header = h;
        this.#paragraph = p;
    }

    static display(message, infoContainer) {
        const infoBox = document.createElement("div");
        const infoBoxHeader = document.createElement("h1");
        const infoBoxParagraph = document.createElement("p");
        
        infoBox.classList.add("ww-info-box");
        infoBoxHeader.classList.add("ww-info-box-header");
        infoBoxParagraph.classList.add("ww-info-box-paragraph");
        
        infoBoxHeader.textContent = message.header;
        infoBoxParagraph.textContent = message.paragraph;

        infoBox.append(infoBoxHeader, infoBoxParagraph);

        if (message instanceof Announcement) {
            const infoBoxSubheader = document.createElement("p");

            infoBoxSubheader.classList.add("ww-info-box-subheader");

            infoBoxSubheader.textContent = message.subheader;

            infoBox.insertBefore(infoBoxSubheader, infoBoxParagraph);
        } else if (message instanceof Event) {
            console.log("EVENT")
            const detailContainer = document.createElement("div");
            const detailValues = [
                message.date,
                message.time,
                message.location,
                message.uniform
            ];
            let details = [];

            detailContainer.classList.add("ww-detail-container");
            
            for (let i = 0; i < 4; i++) {
                details.push(document.createElement("div"));

                const detail = details[i];
                const detailIcon = document.createElement("img");
                const detailParagraph = document.createElement("p");

                detail.classList.add("ww-detail");
                detailIcon.classList.add("ww-detail-icon");
                detailParagraph.classList.add("ww-detail-paragraph");

                detailIcon.src = detailIcons[i];
                detailParagraph.textContent = detailValues[i];

                detail.append(detailIcon, detailParagraph);
                detailContainer.appendChild(detail);
            }

            infoBox.insertBefore(detailContainer, infoBox.querySelector(".ww-info-box-paragraph"));
        }

        infoContainer.insertBefore(infoBox, infoContainer.querySelector(".gradient"));
    }

    get header() {
        return this.#header;
    }

    set header(h) {
        console.log(h);
        this.#header = h;
    }

    get paragraph() {
        return this.#paragraph;
    }

    set paragraph(p) {
        this.#paragraph = p;
    }
}

export class Announcement extends Message {
    #subheader;

    constructor(h, sh, p) {
        super(h, p);
        this.#subheader = sh;
    }

    get subheader() {
        return this.#subheader;
    }

    set subheader(sh) {
        this.#subheader = sh;
    }
}

export class Event extends Message {
    #date;
    #time;
    #location;
    #uniform;

    constructor(h, d, t, l, u, p) {
        super(h, p);
        this.#date = d;
        this.#time = t;
        this.#location = l;
        this.#uniform = u;
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