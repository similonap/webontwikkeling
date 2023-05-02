import express from "express";
const app = express();

app.use(express.static("public"));

app.set("view engine","ejs");
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
    profilePic: "https://th.bing.com/th/id/OIG.cLS8vLrJSpdH1lju5Z3y?pid=ImgGn"
}

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/thisisme", (req, res) => {
    // res.type("html");
    // res.send(`
    //     <html>
    //     <body>
    //     My name is ${me.name} and I am ${me.age} years old<br/>
    //     <img src="${me.profilePic}" width="250"/>
    //     </body>
    //     </html>
    // `);
    let date = new Date();

    let names : string[] = ["Joske","Willy","Mo"];

    let images : string[] = ["https://th.bing.com/th/id/OIG.ctLVftcWUPfPdd0AMWl3?pid=ImgGn",
"https://th.bing.com/th/id/OIG.5jrsRXbG_bPbU4v65zN6?pid=ImgGn","https://th.bing.com/th/id/OIG.ykLL1PNBL1TxiLB5PIoV?pid=ImgGn"]

    res.render("thisisme", {
        me: me,
        date: date,
        names: names,
        images: images
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

    let r = Math.floor((Math.random() * 255)).toString(16).padStart(2,"0");
    let g = Math.floor((Math.random() * 255)).toString(16).padStart(2, "0");
    let b = Math.floor((Math.random() * 255)).toString(16).padStart(2, "0");


    res.send(`
    
        <html>
        <body style="background-color: #${r+g+b}; display: flex; justify-content: center; align-items: center"> 
            #${r+g+b}
        </body>
        </html>
    `);


});

app.listen(app.get("port"), () => {
    console.log(`The application has started and is listening on http://localhost:${app.get("port")}`);
});

