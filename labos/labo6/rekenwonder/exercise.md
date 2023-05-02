# Rekenwonder

## Opgave

In deze opgave gaan we een oefenprogramma schrijven voor leerlingen van het 2de studiejaar. Het programma zal de leerlingen helpen bij het oefenen van de tafels van vermenigvuldiging en deling. De leerling zal willekeurig twee getallen tussen 0 en 10 krijgen en zal de uitkomst moeten ingeven. Het programma zal de leerling laten weten of het antwoord correct is of niet. Het programma zal ook bijhouden hoeveel vragen de leerling correct heeft beantwoord.

## Start code

Je kan voor deze opgave starten met de volgende html/css broncode:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Rekenwonder</title>
        <link rel="stylesheet" href="/css/style.css" />
    </head>
    <body>
        <section class="container">
            <section class="feedback">
                The answer is 10 and your answer is 1. Correct!
            </section>
            <form class="math-form" method="post">
                <input type="number" name="number1" value="6" class="num1" readonly />
                <input type="hidden" name="operator" value="/" />
                <span class="operator">
                    <img src="/images/division.png" alt="divide" />
                </span>
                <input type="number" name="number2" value="1" class="num1" readonly />
                <span class="equals">
                    <img src="/images/equals.png" alt="equals" />
                </span>
                <input type="number" name="result" value="0" class="result" />
                <input type="submit" value="Check" class="check" />
            </form>
            <div class="score">
                1 of 1 correct.
            </div>
        </div>
    </body>
</html>
```

en de volgende css:

```css
body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(to bottom right, #ff758c, #ff7eb3, #8b78ff);
}

.math-form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    position: relative;
    padding-bottom: 80px;
}

.math-form input[type="number"] {
    width: 100px;
    height: 50px;
    background-color: #f5f5f5;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    border: none;
    border-radius: 10px;
    color: #ff758c;
}

.math-form .operator {
    font-size: 36px;
    font-weight: bold;
    color: #ff7eb3;
    display: flex;
    justify-content: center;
    align-items: center;

}

.math-form .equals {
    font-size: 36px;
    font-weight: bold;
    color: #8b78ff;
}

.math-form .check {
    position: absolute; 
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    font-size: 24px;
    background: #8b78ff;
    color: #fff;
    border: none;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
}

.math-form img {
    margin-left: 10px;
    margin-right: 10px;
    width: 50px;
    height: 50px;
}

.feedback {
    color: white;
    text-shadow: 2px 2px #8b78ff;
    font-size: 22px;
    text-align: center;
    margin-bottom: 10px;
}

.score {
    color: white;
    text-shadow: 2px 2px #8b78ff;
    font-size: 22px;
    text-align: center;
    margin-top: 10px;
}
```

Afbeeldingen:

## Stappenplan

### Express applicatie opzetten

Maak een nieuw express project aan met de naam `rekenwonder` dat gebruik maakt van de `ejs` view engine. Installeer al de nodige dependencies.

### EJS en statische bestanden

Maak een ejs view voor deze opgave met de naam `index.ejs` en plaats de inhoud van de html hier in. Zorg ervoor dat de css en de afbeeldingen in een public folder staan en dat deze publiek toegankelijk zijn. Zorg ervoor dat deze pagina zichtbaar is op de root van je express applicatie (via een GET).

### De parameters

Zorg ervoor dat de ejs view de volgende parameters kan gebruiken:
- `timesCorrect`: het aantal keer dat de gebruiker correct heeft geantwoord
- `timesWrong`: het aantal keer dat de gebruiker foutief heeft geantwoord
- `feedback`: een string die feedback geeft over het laatste antwoord van de gebruiker. In het begin is dit `undefined`.
- `number1`: een willekeurig getal tussen 0 en 10
- `number2`: een willekeurig getal tussen 0 en 10
- `operator`: een willekeurig operator die kan zijn `*` of `/`

Geef deze parameters door aan de ejs view en gebruik deze om de juiste waarden weer te geven. 

### Feedback

Zorg ervoor dat de feedback wordt weergegeven in de ejs view. Als er geen feedback is, dan moet er geen feedback worden weergegeven. (Tip: gebruik een if statement in de ejs view)

### Score

Zorg ervoor dat de score wordt weergegeven in de ejs view. De score is het aantal keer dat de gebruiker correct heeft geantwoord op het aantal keer dat de gebruiker heeft geantwoord. 

### Het formulier

Zorg voor een afhandeling van het formulier via een POST request. Kijk na of het gegeven antwoord overeenkomt met het juiste antwoord. Als dit zo is, dan moet de gebruiker feedback krijgen dat het antwoord correct is. Als het antwoord foutief is, dan moet de gebruiker feedback krijgen dat het antwoord foutief is. De score moet ook worden bijgewerkt (correcte antwoorden moeten worden bijgeteld, foutieve antwoorden moeten worden bijgeteld). De feedback moet worden weergegeven in de ejs view. 

Na het versturen van het formulier moet de gebruiker opnieuw een nieuwe deling/vermenigvuldiging krijgen. De parameters moeten worden aangepast zodat de gebruiker een nieuwe opdracht krijgt. Je hergebruikt gewoon dezelfde ejs view die je ook gebruikt voor de GET request.
