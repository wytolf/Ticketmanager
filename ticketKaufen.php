<!DOCTYPE html>
<html>

<head>
    <title>Rechnung</title>
    <meta charset="utf8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <?php
    function isEmpty($attrToCheck)
    {
        if ($attrToCheck == "" || $attrToCheck == null) {
            return true;
        }
        return false;
    }

    $isValid = true;

    $datum = strtotime($_POST['datum']);
    $today = strtotime('today 23:59:59');

    $ortPlz = $_POST['ort'];
    $inputs = explode("/", $ortPlz);
    $plz = $inputs[1];

    if (!isset($_POST['kategorie'])) {
        $isValid = false;
    } else if (isEmpty($_POST['anzahl']) || $_POST['anzahl'] < 1 || $_POST['anzahl'] > 25) {
        $isValid = false;
    } else if (isEmpty($_POST['datum']) || $datum < $today) {
        $isValid = false;
    } else if (isEmpty($_POST['vorname'])) {
        $isValid = false;
    } else if (isEmpty($_POST['nachname'])) {
        $isValid = false;
    } else if (isEmpty($_POST['adresse'])) {
        $isValid = false;
    } else if (isEmpty($ortPlz) || isEmpty($plz)) {
        $isValid = false;
    }

    if ($isValid) {
        echo "<h1>EVZ Ticketshop Rechnung</h1>";
        echo "<fieldset>";
        $date = date_create($_POST['datum']);
        echo "<p>Vielen Dank, dass Sie unser zukünftiges Spiel besuchen kommen.<br>
                Es freut uns sie am " . date_format($date,"d/m/Y") . " begrüssen zu dürfen.<br>
                Untenstehend finden Sie die Rechnung. Sie können sie am Spieltag an der Kasse Bezahlen. Weisen sie dazu diese Rechnung an der Kasse vor.<br>
                <strong>Herzlichen Dank und Hopp EVZ</strong></p>";
        echo " </fieldset>";

        echo "<fieldset>";
        echo "<h2>Rechnung</h2>";
        echo "<span>Käufer:</span>";
        echo "<p>" . $_POST['vorname'] . " " . $_POST['nachname'] . "</p>";
        echo "<p>" . $_POST['adresse'] . "</p>";
        echo " " . $_POST['ort'] . "</p><br>";
        echo "<p>Preis pro Ticket: " . $_POST['kategorie'] . " CHF</p>";
        echo "<p>Anzahl Tickets: " . $_POST['anzahl'] . "</p>";
        $total = $_POST['kategorie'] * $_POST['anzahl'];
        echo "<p><strong>Total: " . $total . " CHF</strong></p>";
        echo " </fieldset>";

        $aktuell = 0;
        if (isset($_COOKIE["fanpunkte"])) {
            $aktuell = intval($_COOKIE["fanpunkte"]);
        }
        $aktuell = $aktuell + $total;
        setcookie("fanpunkte", $aktuell);

        echo "<fieldset>";
        echo "<h2>Fanprogramm</h2>";
        echo "<p>Hier sind Ihre aktuellen Fanpunkte</p>";
        echo "<p><strong>Fanpunkte: " . $aktuell . "</strong></p>";
        echo "</fieldset>";
    } else {
        echo "<p>Error: Formularvalidation fehlgeschlagen. Kauf konnte nicht getätigt werden.</p>";
    }
    ?>
    <a href="index.html">Zurück zum Ticketshop</a>
</body>

</html>