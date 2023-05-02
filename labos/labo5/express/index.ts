import express from "express";

const app = express();

interface Student {
    name: string;
    age: number
}

const students : Student[] = [
    {name: "joske", age: 12},
    {name: "franske", age: 14},
]

app.get("/", async(req, res) => {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await response.json();
    res.json(data);
});

app.get("/test", (req, res) => {
    res.send("Test!!!!");
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});