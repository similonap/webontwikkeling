import express from "express";
import multer from "multer";


const app = express();

app.set("view engine", "ejs");
app.use(express.static("uploads"));

const upload = multer({
    dest: "uploads",
});

app.get("/", (req, res) => {
    res.render("index");
});

interface FilesDictionary {
    [fieldname: string]: Express.Multer.File[];
}

app.post(
    "/upload",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "gallery", maxCount: 8 },
    ]),
    (req, res) => {
        let files = req.files as FilesDictionary
        let avatar = files["avatar"][0];

        res.type("text/html");
        res.send(`<h1>Avatar</h1>
                  <img src="/${avatar.filename}"><br/>
                  <h1>Photos</h1>
                  ${files["gallery"].map((file) => `<img src="/${file.filename}">`).join("")}}`);
    }
);

app.get('/users',async (req,res) =>{
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await response.json();
    res.type('application/json');
    res.json(data);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});