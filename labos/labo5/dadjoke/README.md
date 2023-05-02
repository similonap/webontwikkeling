# DadJoke

Schrijf een express server die de volgende routes ondersteund:
- /joke/json
- /joke/html

Deze routes moeten allebij een dadjoke ophalen van https://icanhazdadjoke.com/ en deze teruggeven in de juiste content-type. Als de route /joke/json is, moet de dadjoke in JSON formaat teruggegeven worden. Als de route /joke/html is, moet de dadjoke in HTML formaat teruggegeven worden.

De applicatie moet op poort 3000 draaien.

## Solution

```
import express from "express";

const app = express();

app.set("port", 3000);

app.get("/joke/json", async(req, res) => {
    let response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json"
        }
    });
    let data = await response.json();

    res.type("application/json");
    res.json(data);
});

app.get("/joke/html", async(req, res) => {
    let response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json"
        }
    });
    let data = await response.json();

    res.type("text/html");
    res.send(`<h1>${data.joke}</h1>`);
});

app.listen(app.get("port"), () => {
    console.log("Server started on port 3000");
});
```