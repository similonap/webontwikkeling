# Asynchroon programmeren

## Synchrone code

Tot nu toe hebben we enkel met synchrone code gewerkt. Dit betekent dat de code die we schrijven, één voor één wordt uitgevoerd. Als we een functie aanroepen, wordt de functie uitgevoerd en wanneer de functie klaar is, wordt de volgende regel code uitgevoerd. Dit is de manier waarop we over het algemeen code schrijven. We schrijven code van boven naar beneden en de code wordt van boven naar beneden uitgevoerd.

```typescript
console.log("Stap 1");
console.log("Stap 2");
console.log("Stap 3");
```

Als we deze code uitvoeren, zien we dat de drie regels code één voor één worden uitgevoerd. De eerste regel wordt uitgevoerd, dan de tweede en dan de derde. Dit is synchrone code.

## Asynchrone code

Bij asynchrone code is het bovenstaande niet het geval. Bij asynchrone code wordt de code niet één voor één uitgevoerd. In plaats daarvan kan het zijn dat een bepaald stuk code wordt uitgevoerd, terwijl een ander stuk code wordt uitgevoerd. We hebben in principe al eens een voorbeeld gezien van asynchrone code. Dit was bijvoorbeeld het geval bij de `setTimeout` functie. We hebben gezien dat we een functie kunnen meegeven aan de `setTimeout` functie. Deze functie wordt pas na een bepaalde tijd uitgevoerd. Dit is een voorbeeld van asynchrone code. De code die in de functie staat, wordt niet direct uitgevoerd. In plaats daarvan wordt de code uitgevoerd na een bepaalde tijd.

```typescript
console.log("Stap 1");
setTimeout(() => console.log("Stap 2"), 1000);
console.log("Stap 3");
```

Dit geeft ons het volgende resultaat:

```text
Stap 1
Stap 3
Stap 2
```

Je ziet nu dat hoewel de code van "Stap 2" op lijn 2 staat, deze pas na "Stap 3" wordt uitgevoerd. Dit komt omdat de code van "Stap 2" pas na 1 seconde wordt uitgevoerd. 

## Promises

Een belangrijk mechanisme om asynchrone code te schrijven is het gebruik van `Promises`. Een `Promise` is een object dat een waarde bevat die pas op een later moment beschikbaar zal zijn. Zoals het engelse woord al aangeeft, is een `Promise` een belofte dat de functie die een promise teruggeeft, op een later moment een waarde zal teruggeven.

Een van de meest bekende functies die een `Promise` gebruikt is de `fetch` functie. Deze functie wordt gebruikt om data op te halen van een server. Alle communicatie tussen je programma en de server moet synchroon gebeuren. Dit komt omdat je niet wil dat je programma wacht tot er een antwoord komt van de server. Zelfs al gaat de communicatie met de server heel snel, ze gaat in vergelijking met de uitvoering van een gewone instructie veel trager. 

### Verschillende statussen van een Promise

Een `Promise` heeft verschillende statussen. Een `Promise` kan in één van de volgende statussen zitten:
- pending: de `Promise` is nog niet afgerond. We hebben dus nog geen waarde.
- resolved: de `Promise` is afgerond. We hebben nu een waarde.
- rejected: de `Promise` is afgerond, maar er is een fout opgetreden. We hebben nu een fout.

De `Promise` begint altijd in de pending status. Wanneer de `Promise` afgerond is, kan deze in de fulfilled status zitten of in de rejected status.

### Aanmaken van een Promise

We gaan het gebruik van een `Promise` bekijken aan de hand van een voorbeeld. We gaan een `Promise` maken die een getal teruggeeft. Deze zal een vermenigvuldiging uitvoeren. We maken een `Promise` aan met de `new Promise` constructor. Deze constructor heeft als argument een functie die twee argumenten heeft: `resolve` en `reject`. Deze twee argumenten zijn functies die we kunnen aanroepen om de `Promise` te laten veranderen van status. Het type dat de promise teruggeeft zetten we tussen de `< >` tekens. In ons geval is dit een `number`.

```typescript
const promise = new Promise<number>((resolve, reject) => {
    resolve(2*2);
});
```

Je ziet dat we hier de `resolve` functie aanroepen met de vermenigvuldiging van 2 en 2. Dit betekent dat de `Promise` nu in de fulfilled status zit en we dus een waarde hebben.

### Then functie

Willen we deze waarde gebruiken, dan moeten we een `then` functie aanroepen op de `Promise`. Deze functie heeft als argument een functie die als argument de waarde bevat die de `Promise` teruggeeft. In ons geval is dit een `number`.

```typescript
const promise = new Promise<number>((resolve, reject) => {
    resolve(2*2);
});

promise.then((result) => {
    console.log(result);
});
``` 

De functie die we meegeven aan de `then` functie wordt pas uitgevoerd wanneer de `Promise` in de fulfilled status zit. Dit betekent dat de functie die we meegeven aan de `then` functie pas uitgevoerd wordt wanneer de `Promise` afgerond is.

Uiteraard is dit een vreemd voorbeeld omdat de vermenigvuldiging van 2 en 2 heel snel gebeurt. In de praktijk duurt de code die in de `Promise` staat veel langer. We kunnen dit eenvoudig simuleren door de `resolve` functie pas aan te roepen na een bepaalde tijd. Dit doen we met de `setTimeout` functie.

```typescript
const promise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        resolve(2*2)
    }, 1000);
});

promise.then((result) => {
    console.log(result);
});
```

Bij het uitvoeren van deze code ga je zien dat de `then` functie pas na 1 seconde wordt uitgevoerd. Dit komt omdat de `Promise` pas na 1 seconde in de fulfilled status zit.

### Promise als return type

Meestal maken we niet zelf een `Promise` aan, maar gebruiken we een functie die een `Promise` teruggeeft. Deze functie kan dan als return type `Promise` hebben. We breiden ons voorbeeld uit met een functie die een `Promise` teruggeeft. Deze functie zal een vermenigvuldiging uitvoeren. We geven de functie een argument mee: `number1` en `number2`. Deze functie zal de vermenigvuldiging van deze twee getallen teruggeven.

```typescript
const multiply = (number1: number, number2: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(number1 * number2);
        }, 1000);
    });
};
```

Als je deze functie gewoon aanroept alsof het een normale functie is kan je zien dat deze een `Promise` teruggeeft.

```typescript
const result = multiply(2, 2);
console.log(result); 
```

Je zal hier als output het volgende krijgen:

```
Promise { <pending> }
```

Dit betekent dat de `Promise` nog niet afgerond is. We kunnen de `then` functie aanroepen op deze `Promise` om de waarde te gebruiken.

```typescript
const result = multiply(2, 2);
result.then((result) => {
    console.log(result);
});
```

of we kunnen de `then` functie meteen aanroepen op de functie.

```typescript
multiply(2, 2).then((result) => {
    console.log(result);
});
```

### Then chaining

Willen we bijvoorbeeld de `multiply` functie twee keer gebruiken, dan zouden we dit op de volgende manier kunnen doen.

```typescript
multiply(2, 2).then((result) => {
    multiply(result, 2).then((result) => {
        console.log(result);
    });
});
```

Hoewel dat dit werkt is dit niet de beste manier om dit te doen. Je zal al snel zien als je dit vaker moet doen dat je code heel snel onoverzichtelijk wordt. Gelukkig is er een betere manier om dit te doen. We kunnen de `then` functie meerdere keren aanroepen op dezelfde `Promise`. Dit noemen we `then chaining`. We kunnen dit ook doen met de `multiply` functie.

```typescript
multiply(2, 2)
    .then((result) => {
        return multiply(result, 2);
    })
    .then((result) => {
        console.log(result); // 8
    });
```

Je ziet hierboven dat als je iets wil uitvoeren nadat de eerste `then` functie is uitgevoerd, je dan een nieuwe promise moet teruggeven. Deze nieuwe promise zal dan weer gebruikt worden in de volgende `then` functie. Dit is de manier om `then chaining` te doen. Zo kan je meerdere multiply functies aan elkaar koppelen. Dit kan je zoveel keren doen als je wil zonder dat je code onoverzichtelijk wordt.

```typescript
multiply(2, 2)
    .then((result) => {
        return multiply(result, 2);
    })
    .then((result) => {
        return multiply(result, 2);
    })
    .then((result) => {
        return multiply(result, 2);
    })
    .then((result) => {
        console.log(result); // 32
    });
```

Voor een ander voorbeeld, gaan we de `fetch` functie gebruiken. Deze functie wordt gebruikt om data op te halen van een server. We gaan de data van de volgende url opvragen: `https://jsonplaceholder.typicode.com/todos/1`. Deze url bevat een todo item. We gaan de titel van dit todo item opvragen.

```typescript
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((todo: Todo) => console.log(todo.title));
```

Zoals we al vermeld hebben is de `fetch` functie een functie die een `Promise` teruggeeft. Deze `Promise` bevat de response van de server. Als de server een response teruggeeft, dan zal de `Promise` in de fulfilled status zitten en zal de eerste functie uitgevoerd worden die met de `then` functie is meegegeven. Omdat het omzetten van de response naar json ook een asynchrone operatie is, is het nodig om hier ook een `then` functie aan toe te voegen. Deze wordt pas uitgevoerd wanneer de response omgezet is naar json. Als laatste wordt de titel van het todo item afgedrukt.

### Catch

Zoals we al vermeld hadden kan een `Promise` in de rejected status komen te zitten. Dit betekent dat er een fout is opgetreden. Bijvoorbeeld als we onze multiply functie zouden uitbreiden met een foutmelding als het resultaat groter is dan 10.

```typescript
const multiply = (number1: number, number2: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            if (number1 * number2 > 10) {
                reject("Result is greater than 10");
            } else {
                resolve(number1 * number2);
            }
        }, 1000);
    });
};
```

Willen we deze foutmelding opvangen kunnen we dit niet doen met een try/catch blok maar moeten we een catch functie toevoegen achter de `then` functie.

```typescript
multiply(2, 2)
    .then((result) => {
        return multiply(result, 2);
    })
    .then((result) => {
        return multiply(result, 2);
    })
    .then((result) => {
        console.log(result); // 16
    })
    .catch((error) => {
        console.log(error);
    });
```

Bij het uitvoeren van deze code zal je zien dat de foutmelding wordt afgedrukt en de rest van de `then` functies niet meer worden uitgevoerd.

### Async/await

Er bestaat ook een andere manier om met promises te werken. Dit is met behulp van async/await. Eigenlijk is dit gewoon 'syntax sugar' om het gebruik van promises wat overzichtelijker te maken. We hernemen de multiply functie.

```typescript
const multiply = (number1: number, number2: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(number1 * number2);
        }, 1000);
    });
};
```

In plaats van de `then` functie te gebruiken kunnen we ook de `await` keyword gebruiken.

```typescript
const result = await multiply(2, 2);
console.log(result);
```

Opgelet, je kan de `await` keyword enkel gebruiken binnen een functie die de `async` keyword gebruikt. Als je dit niet doet zal je een foutmelding krijgen. Dus wil je `await` gebruiken, dan moet je de functie ook `async` die await gebruikt async maken. 

```typescript
const main = async () => {
    const result = await multiply(2, 2);
    console.log(result);
};
main();
```

Om aan te tonen dat deze code overzichtelijker is dan de code met `then` functies, gaan we de `then` functies vervangen door `await` keywords.

```typescript
const main = async () => {
    let result = await multiply(2, 2);
    result = await multiply(result, 2);
    result = await multiply(result, 2);
    console.log(result); // 16
};
main();
```

Je ziet dat de code hierboven veel overzichtelijker is dan de code met `then` functies. Eigenlijk is dit gewoon een andere manier om de `then` functies te gebruiken. 

Werk je met `async` functies, dan is het ook mogelijk om `try/catch` blokken te gebruiken om fouten op te vangen.

```typescript
const main = async () => {
    try {
        let result = await multiply(2, 2);
        result = await multiply(result, 2);
        result = await multiply(result, 2);
        console.log(result); // 16
    } catch (e) {
        console.log(e);
    }
};
main();
```

## Promise helper functions

### Promise.all

De `Promise.all` functie wordt gebruikt om meerdere promises tegelijkertijd uit te voeren. Als je bijvoorbeeld 2 promises hebt die je tegelijkertijd wil uitvoeren en vervolgens wil je de resultaten van beide promises gebruiken, dan kan je dit doen met de `Promise.all` functie.

Stel dat we een twee functies hebben die een promise teruggeven. De eerste functie haalt de naam van een gebruiker op en de tweede functie haalt de leeftijd van een gebruiker op. En we gaan er vanuit dat deze twee functies tegelijkertijd moeten worden uitgevoerd. De functie die de naam ophaalt duurt 1 seconde en de functie die de leeftijd ophaalt duurt 2 seconden.

```typescript
const getName = (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve("John");
        }, 1000);
    });
};

const getAge = (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(25);
        }, 2000);
    });
};
```

Als we deze twee functies willen uitvoeren, dan kunnen we dit doen met de `Promise.all` functie. We geven de `Promise.all` functie een array mee met de promises die we willen uitvoeren. De `Promise.all` functie zal een promise teruggeven die fulfilled zal worden wanneer alle promises uitgevoerd zijn. De `Promise.all` functie zal een array teruggeven met de resultaten van de promises.

```typescript
Promise.all([getName(), getAge()])
    .then((result: string[]) => {
        console.log(result); // ["John", 25]
    }).catch((error) => {
        console.log(error);
    });
```

En de tijd die nodig is om de promises uit te voeren is de langste tijd van alle promises. In dit geval is dat 2 seconden. 

We kunnen dit concept ook toepassen met de fetch functie. Stel dat we drie verschillende todo's willen ophalen van een API:
- https://jsonplaceholder.typicode.com/todos/1
- https://jsonplaceholder.typicode.com/todos/2
- https://jsonplaceholder.typicode.com/todos/3

En we willen die calls tegelijkertijd uitvoeren. Dan kunnen we dit ook doen met de `Promise.all` functie.

```typescript
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const todo1 = fetch("https://jsonplaceholder.typicode.com/todos/1").then((response) => response.json());
const todo2 = fetch("https://jsonplaceholder.typicode.com/todos/2").then((response) => response.json());
const todo3 = fetch("https://jsonplaceholder.typicode.com/todos/3").then((response) => response.json());

Promise.all([todo1, todo2, todo3])
.then((result: Todo[]) => {
    console.log(result[0].title);
    console.log(result[1].title);
    console.log(result[2].title);
}).catch((error) => {
    console.log(error);
});
```

Het resultaat van de `Promise.all` functie is een array met de resultaten van de promises. Let op dat je niet vergeet de `json()` functie aan te roepen op de response. Anders krijg je een Response object terug en niet de data die je verwacht.

### Promise.race

Wil je meerdere promises tegelijkertijd uitvoeren en enkel de waarde hebben die het snelste beschikbaar is dan kan je Promise.race gebruiken. Stel dat je twee functies hebt die allebei de naam van een gebruiker ophalen. De eerste functie duurt 1 seconde en de tweede functie duurt 2 seconden. 

```typescript
const getNameFromDatabase = (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve("John");
        }, 3000);
    });
};

const getNameFromCache = (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve("John");
        }, 500);
    });
};
```

Wil je enkel de name gebruiken van de functie die het snelste klaar is, dan gebruiken we hiervoor de `Promise.race` functie. Deze zal al na 500 ms uitgevoerd worden omdat de `getNameFromCache` functie het snelste klaar is.

```typescript
Promise.race([getNameFromDatabase(), getNameFromCache()])
    .then((result: string) => {
        console.log(result); // "John"
    });
``` 
