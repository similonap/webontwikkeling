import express from "express";
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.set("port", 3000);

interface User {
    name: string;
    age: number;
    profilePic: string;
}

interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    image_front: string;
    image_back: string;
}

let me : User = {
    name: "Andie Similon",
    age: 38,
    profilePic: "https://th.bing.com/th/id/OIG.9RLQdzLq1eCGmAfzl4h5?pid=ImgGn"
}

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/thisisme", (req, res) => {

    let names: string[] = [
        "Jos",
        "Willy",
        "Mo"
    ]

    res.render("thisisme", {
        me: me,
        names: names
    });
});

app.get("/thisismejson", (req, res) => {
    res.json(me);
});

app.get("/pikachu", async(req, res) => {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    let json = await response.json();
    let pikachu : Pokemon = {
        name: json.name,
        id: json.id,
        weight: json.weight,
        height: json.height,
        base_experience: json.base_experience,
        image_front: json.sprites.front_default,
        image_back: json.sprites.back_default
    }

    res.json(pikachu);
})

app.get("/pikachuhtml", async(req, res) => {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    let json = await response.json();
    let pikachu : Pokemon = {
        name: json.name,
        id: json.id,
        weight: json.weight,
        height: json.height,
        base_experience: json.base_experience,
        image_front: json.sprites.front_default,
        image_back: json.sprites.back_default
    }

    res.send(`
        <html>
            <body>
                <img src="${pikachu.image_back}"/>
            </body>
        </html>
    `)
})


app.get("/randomcolor", (req, res) => {

    let aa = Math.floor((Math.random() * 255)).toString(16).padStart(2,"0");
    let bb = Math.floor((Math.random() * 255)).toString(16).padStart(2, "0");
    let cc = Math.floor((Math.random() * 255)).toString(16).padStart(2, "0");



    res.send(`
    
        <html>
        <body style="background-color: #${aa+bb+cc}; display: flex; justify-content: center; align-items: center"> 
            #${aa+bb+cc}
        </body>
        </html>
    `);


})

app.listen(app.get("port"), () => {
    console.log(`The application has started and is listening on http://localhost:${app.get("port")}`);
});

