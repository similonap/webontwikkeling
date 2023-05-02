import express from "express";

const app = express();

app.set("view engine", "ejs");

app.set("port", 3000);

app.use(express.static("public"));

let hanoi: number[][] = [[0,1,2,3,4,5],[],[]];

const hasIllegalDiskPlacement = () => {
    for (let pole of hanoi) {
        for (let i=0;i<pole.length;i++) {
            if (pole[i-1] > pole[i]) {
                return true;
            }
        }
    }
    return false;
}

const isSolved = () => (hanoi[0].length == 0 && hanoi[1].length == 0);

app.get("/", (req,res) => {
    let fromPole = parseInt(req.query.from as string);
    let toPole = parseInt(req.query.to as string);
    let error = undefined;
    let success = undefined;
    if (!isNaN(fromPole) && !isNaN(toPole)) {
        let disk = hanoi[fromPole].pop();
        if (disk != undefined) {
            hanoi[toPole].push(disk);
        }
        if (hasIllegalDiskPlacement()) {
            if (disk != undefined) {
                hanoi[fromPole].push(disk)
            }
            hanoi[toPole].pop();
            error = "This is an illegal move";
        }
    }

    if (isSolved()) {
        success = "You solved the puzzle!";
    }

    res.render("index", {error: error, success: success, hanoi: hanoi});
});

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});