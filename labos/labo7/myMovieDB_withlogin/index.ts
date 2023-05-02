import express, { NextFunction, Request, Response } from "express";
import CryptoJS from "crypto-js";
import session from "express-session";
const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(session({
    secret: 'keyboard cat'
  }));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static("public"));

declare module "express-session" {
    interface Session {
      email: string;
    }
}

interface Movie {
    name: string;
    myScore: number;
    image: string; 
    description: string;
}

interface User {
    email: string;
    password: string;
}

let users: User[] = [
    {
        email: "andie.similon@ap.be",
        password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
    }
]

let movies : Movie[] = [
    {
        name: "The Llama-trix", 
        myScore: 90, 
        image: "https://th.bing.com/th/id/OIG.i8IOYTPBiYHkeTcRIMKY?pid=ImgGn", 
        description: "In \"The Llama-trix\", Neo is replaced by a rebellious llama named Llamo, who must navigate a digital world controlled by an evil alpaca known as The Farmer. Along the way, Llamo meets a wise old sheep named Mutton and a sassy llama named Trinity, who help him discover his true llama powers and defeat The Farmer's army of sheep drones. With epic llama battles and mind-bending woolly plot twists, \"The Llama-trix\" is a hilarious and absurd parody of the sci-fi classic."
    },
    {
        name: "Llamavengers: Infinity Shear",
        myScore: 87,
        image: "https://th.bing.com/th/id/OIG.Gvp0SFMNqjqOQMmWsZQ0?pid=ImgGn",
        description: "In \"Llamavengers: Infinity Shear\", an all-llama superhero team must join forces to stop the evil Llanos, who is on a quest to collect the six Infinity Shears that will give him the power to shear all llamas in the universe. With hilarious battles, endearing friendships, and the fate of the llama world at stake, this parody of the Marvel hit is filled with action, humor, and wool."
        },
        
        {
        name: "The Lord of the Shears: The Fellowship of the Llama",
        myScore: 92,
        image: "https://th.bing.com/th/id/OIG.IWS3Zl0J5XKO9VuqPg.f?pid=ImgGn",
        description: "A young llama named Frodolama must embark on an epic quest to destroy the One Shear, a powerful tool that the Dark Lord Saurllama wants to use to rule the world. Joined by a brave fellowship of llamas and other creatures, Frodolama must overcome great odds and treacherous terrain in this hilarious parody of the beloved fantasy saga."
        },
        
        {
        name: "Llama Wars: Episode IV - A New Shear",
        myScore: 89,
        image: "https://th.bing.com/th/id/OIG.9ZhTq4d1udv7DLdJUA1Y?pid=ImgGn",
        description: "In a galaxy ruled by the oppressive Llama Empire, a young farmer named Luke Llamawalker finds himself caught up in a rebellion to save the universe. Joining forces with wise mentor Obi-Wan Llamanobi and roguish smuggler Han Llamasolo, Luke battles the sinister Darth Llama in this woolly parody of the iconic sci-fi epic."
        },
        
        {
        name: "Harry Trotter and the Philosopher's Shear",
        myScore: 86,
        image: "https://th.bing.com/th/id/OIG.MwxfJujkxPyjfvd2B9DD?pid=ImgGn",
        description: "Young llama Harry Trotter discovers he's a wizard and embarks on a magical adventure to Hogwart's School of Llamacraft and Wizardry. Along the way, he makes friends and uncovers the secret of the legendary Philosopher's Shear in this enchanting, furry spin on the famous tale."
        },
        
        {
        name: "Llamatopia",
        myScore: 81,
        image: "https://th.bing.com/th/id/OIG.w4L2C7Bv3LFDpZDHrar3?pid=ImgGn",
        description: "In a post-apocalyptic world where humans have vanished, llamas have evolved to create their own utopian society. However, when an external threat endangers their peaceful existence, a group of heroic llamas must work together to save their world. This epic adventure is a heartwarming and humorous take on the dystopian genre."
        },
        
        {
        name: "Llama Runner",
        myScore: 84,
        image: "https://th.bing.com/th/id/OIG.h0MfiUY4VSc4Q4w8cxAq?pid=ImgGn",
        description: "In a futuristic city, a retired llama detective named Rick Llamard is forced to hunt down a group of rogue llamas known as 'Replicamas.' As he delves deeper into the case, Rick questions the nature of his own existence in this thrilling and thought-provoking parody of the sci-fi classic."
        }
];

app.use((req, res, next) => {
    res.locals.email = req.session.email;
    next();
});

app.get("/movies", (req, res) => {
    res.render("movies", {movies: movies, success: undefined});
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/logout", (req, res) => {
    req.session.email = "";
    res.locals.email = "";
    res.render("movies", {movies: movies, success: "You succesfully logged out"});
});

app.post("/login", (req, res) => {
    let user = req.body;

    let hashedPassword = CryptoJS.SHA256(user.password).toString();    

    let foundUser = users.find(u => u.email === user.email && u.password === hashedPassword);
    if (foundUser) {
        req.session.email = foundUser.email;
        res.locals.email = foundUser.email;
    }
    res.render("movies", {movies: movies, success: "You succesfully logged in"});
})
app.get("/movies/:id", (req, res) => {
   let id = parseInt(req.params.id);
    res.render("movie", {movie: movies[id]}); 
});

app.get("/addmovie", (req, res) => {
    res.render("addmovie");
});

app.post("/addmovie", (req, res) => {
    let movie = req.body;
    movies.push(movie);
    res.render("movies", {movies: movies, success: "Movie succesfully added"});

});

app.listen(app.get("port"), () => {
    console.log(`The application is running http://localhost:${app.get("port")}`);
})