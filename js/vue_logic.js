Vue.createApp({
    data() {
        return {
            kategorie: 0,
            anzahl: 0,
            datum: "",
            vorname: "",
            nachname: "",
            adresse: "",
            hausnummer: "",
            ort: "",
            kategorieError: "",
            anzahlError: "",
            datumError: "",
            vornameError: "",
            nachnameError: "",
            adresseError: "",
            ortError: ""
        }
    },
    methods: {
        berechneGesamtpreis: function () {
            let gesamtpreis = this.kategorie * this.anzahl;
            return gesamtpreis.toFixed(2);
        },
        checkKategorie: function () {
            if (isEmpty(this.kategorie)) { this.kategorieError = "Bitte geben Sie eine gültige Kategorie ein." }
            else { this.kategorieError = "" }
        },
        checkAnzahl: function () {
            if (isEmpty(this.anzahl)) {
                this.anzahlError = "Bitte geben Sie eine Anzahl ein.";
                return false;
            }
            else if (this.anzahl <= 0) {
                this.anzahlError = "Ticketanzahl darf nicht negativ sein.";
                return false;
            }
            else if (this.anzahl > 25) {
                this.anzahlError = "Bitte wenden Sie sich für Gruppen über 25 Personen an unsere Anministation";
                return false;
            }
            else {
                this.anzahlError = "";
                drawTickets(this.anzahl);
                return true;
            }
        },
        checkDatum: function () {
            let datumString = document.getElementById('datum').value;
            let datumPast = new Date(datumString);
            let today = new Date();
            if (isEmpty(this.datum)) { this.datumError = "Bitte geben Sie ein gültiges Datum ein."; }
            else if (datumPast < today) { this.datumError = "Es können nur Tickets für zukünftige Spiele gekauft werden."; }
            else { this.datumError = ""; }
        },
        checkVorname: function () {
            if (isEmpty(this.vorname)) { this.vornameError = "Bitte geben Sie einen Vornamen ein."; }
            else { this.vornameError = ""; }
        },
        checkNachname: function () {
            if (isEmpty(this.nachname)) { this.nachnameError = "Bitte geben Sie einen Nachnamen ein."; }
            else { this.nachnameError = ""; }
        },
        checkAdresse: function () {
            if (isEmpty(this.adresse)) { this.adresseError = "Bitte geben Sie eine gültige Adresse ein."; }
            else { this.adresseError = ""; }
        },
        checkOrt: function () {
            const inputs = this.ort.split("/");
            let plz = inputs[1];

            if (isEmpty(this.ort)) { this.ortError = "Bitte geben Sie einen gültigen Ort ein."; }
            else if (isEmpty(plz)) {
                this.ortError = "Format: [\"Ihr Ort\" / \"Ihre PLZ\"]";
            }
            else { this.ortError = ""; }
        }
    }
}).mount('#ticketKaufen');

function isEmpty(attrToCheck) {
    if (attrToCheck == "" || attrToCheck == null) {
        return true;
    }
    return false;
}

let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

function drawTickets(anzahl) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();

    let nextStartPoint = 0;
    for (let i = 0; i < anzahl; i++) {
        drawTicketSymbol(nextStartPoint, 0);
        nextStartPoint = nextStartPoint + 50;
    }
}

function drawTicketSymbol(x, y) {
    c.fillStyle = "gold";
    c.strokeStyle = "silver";
    c.fillRect(x + 2, y + 2, 42, 62);
    //Stick 1
    c.moveTo(x + 2, y + 2);
    c.lineTo(x + 32, y + 62);
    c.lineTo(x + 42, y + 62);
    //Puck
    c.moveTo(x + 27, y + 62);
    c.lineTo(x + 17, y + 62);
    //Stick 2
    c.moveTo(x + 2, y + 62);
    c.lineTo(x + 12, y + 62);
    c.lineTo(x + 42, y + 2);
    //Border
    c.moveTo(x, y);
    c.lineTo(x, y + 65);
    c.lineTo(x + 45, y + 65);
    c.lineTo(x + 45, y);
    c.lineTo(x, y);

    c.stroke();
}