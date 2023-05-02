# Hanoi

In deze opgave gaan we een spelletje programmeren. Het spelletje is gebaseerd op het bekende spelletje [Hanoi](https://nl.wikipedia.org/wiki/Toren_van_Hanoi). Het spelletje bestaat uit 3 stokken en een aantal schijven. De schijven hebben verschillende diameters. Het doel van het spel is om alle schijven van de eerste stok naar de laatste stok te verplaatsen. Je mag echter maar 1 schijf tegelijk verplaatsen en een schijf mag enkel op een andere schijf geplaatst worden als de diameter van de schijf die je wil verplaatsen kleiner is dan de diameter van de schijf waar je hem op wil plaatsen.

In deze opgave maken we gebruik van 3 stokken en 6 schijven.

## Begin situatie

We hebben een HTML pagina gekregen waarin we de begin situatie van het spelletje kunnen zien. De HTML pagina bevat een aantal elementen die we nodig hebben om het spel te kunnen programmeren.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/styles.css" />
    <title>Hanoi</title>
</head>
<body>
    <div class="container">    
        <div class="pole pole0" id="pole-0">  
                <div class="disk disk-0"></div>
                <div class="disk disk-1"></div>
                <div class="disk disk-2"></div>
                <div class="disk disk-3"></div>
                <div class="disk disk-4"></div>
                <div class="disk disk-5"></div>
        </div>
        <div class="pole pole1" id="pole-1">
        </div>
        <div class="pole pole2" id="pole-2">
        </div>
    </div>    
</body>
</html>
```

en de volgende CSS:

```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
}
.pole {
    width: 10px;
    height: 200px;
    background-color: #333;
    position: relative;
    align-items: center;
    display: flex; /* added this */
    flex-direction: column-reverse; /* added this */
}

.pole1 {
    margin-left: 150px
}

.pole2 {
    margin-left: 150px
}

.pole::before {
    content: "";
    width: 100px;
    height: 10px;
    background-color: #333;
    position: absolute;
    bottom: -10px;
    left: -45px;
}

.disk {
    height: 20px;
}

.disk-0 {
    width: 80px;
    background-color: #ff0000;
}

.disk-1 {
    width: 70px;
    background-color: #ffa500;
}

.disk-2 {
    width: 60px;
    background-color: #ffff00;
}

.disk-3 {
    width: 50px;
    background-color: #008000;
}

.disk-4 {
    width: 40px;
    background-color: #0000ff;
}

.disk-5 {
    width: 30px;
    background-color: #800080;
}
```

Probeer de HTML pagina te openen in je browser. Je ziet dat er 3 stokken zijn met 6 schijven. De schijven zijn op de eerste stok geplaatst. De schijven zijn oplopend van grootte. De grootste schijf staat onderaan en de kleinste schijf staat bovenaan. Probeer de schijven te verplaatsen door de HTML pagina aan te passen, zorg ervoor dat je de structuur van de HTML goed begrijpt.

## Express app

Maak een nieuwe express applicatie aan en zorg ervoor dat de HTML pagina die je hierboven ziet in de browser te zien is als je naar de root van je applicatie navigeert. De CSS bestanden moeten ook beschikbaar zijn. Gebruik hiervoor ejs om de HTML pagina te renderen.

## Schijven

Maak een array die de beginsituatie van de schijven voorstelt. De array bevat 3 arrays. De eerste array bevat de schijven die op de eerste stok staan. De tweede array bevat de schijven die op de tweede stok staan. De derde array bevat de schijven die op de derde stok staan. De schijven zijn oplopend van grootte. De grootste schijf staat onderaan en de kleinste schijf staat bovenaan.

```typescript
let hanoi: number[][] = [[0,1,2,3,4,5],[],[]];
```

Geef de `hanoi` array mee aan de ejs template. In de ejs template kan je de array gebruiken om de schijven te renderen. De schijven moeten op de juiste plaats in de HTML pagina geplaatst worden. De schijven moeten ook op de juiste plaats in de array geplaatst worden. Gebruik hiervoor de for loop in de ejs template.

