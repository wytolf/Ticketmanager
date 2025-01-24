function validateForm() {
    let isValid = true;
    let message = "<strong>Formular konnte nicht abgesendet werden:</strong> <br>";

    let kategorie = document.getElementById('kategorie');
    if (isEmpty(kategorie.value)) {
        isValid = false;
        message = message + "- Fehler im Feld Kategorie. --> Kategorie muss angewählt werden.<br>"
    }

    let anzahl = document.getElementById('anzahl');
    if (isEmpty(anzahl.value)) {
        isValid = false;
        message = message + "- Fehler im Feld Anzahl. --> Anzahl muss angegeben werden.<br>"
    } else if (anzahl.value < 1) {
        isValid = false;
        message = message + "- Fehler im Feld Anzahl. --> Anzahl muss über 0 liegen.<br>"
    } else if (anzahl.value > 25) {
        isValid = false;
        message = message + "- Fehler im Feld Anzahl --> Anzahl darf maximal 25 sein.<br>"
    }

    let datumString = document.getElementById('datum').value;
    let datumPast = new Date(datumString);
    let today = new Date();
    if (isEmpty(datumString)) {
        isValid = false;
        message = message + "- Fehler im Feld Datum. --> Datum muss angegeben werden.<br>"
    } else if (datumPast < today) {
        isValid = false;
        message = message + "- Fehler im Feld Datum. --> Datum muss in der Zukunft liegen.<br>"
    }

    let vorname = document.getElementById('vorname');
    if (isEmpty(vorname.value)) {
        isValid = false;
        message = message + "- Fehler im Feld Vorname. --> Vorname darf nicht leer sein.<br>"
    }

    let nachname = document.getElementById('nachname');
    if (isEmpty(nachname.value)) {
        isValid = false;
        message = message + "- Fehler im Feld Nachname. --> Nachname darf nicht leer sein.<br>"
    }

    let adresse = document.getElementById('adresse');
    if (isEmpty(adresse.value)) {
        isValid = false;
        message = message + "- Fehler im Feld Adresse. --> Adresse darf nicht leer sein.<br>"
    }

    let ort = document.getElementById('ort');
    const inputs = ort.value.split("/");
    let plz = inputs[1];
    if (isEmpty(ort.value)) {
        isValid = false;
        message = message + "- Fehler im Feld Ort/PLZ. --> Ort darf nicht leer sein.<br>"
    } else if (isEmpty(plz)) {
        isValid = false;
        message = message + "- Fehler im Feld Ort/PLZ. --> Format Fehler. Bitte schauen Sie, dass folgendes Format eingehalten wird: [\"Ihr Ort\" / \"Ihre PLZ\"]<br>"
    }

    document.getElementById('submitError').innerHTML = message;
    return isValid;
}

function isEmpty(attrToCheck) {
    if (attrToCheck == "" || attrToCheck == null) {
        return true;
    }
    return false;
}