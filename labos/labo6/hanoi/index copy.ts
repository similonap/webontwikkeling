import express from "express";

const app = express();

app.set("view engine", "ejs");

app.set("port", 3000);

app.use(express.static("public"));

let hanoi: number[][] = [[0,1,2,3,4,5],[],[]];

let from : number = -1;
let to : number = -1;

const copyArray = (array: number[][]) => {
    let newArray: number[][] = [];
    for (let row of array) {
        let newRow: number[] = [];
        for (let column of row) {
            newRow.push(column);
        }
        newArray.push(newRow);
    }
    return newArray;
}


const isLegalMove = (from: number, to: number) => {
    let hanoiCopy = copyArray(hanoi);
    let disk = hanoiCopy[from].pop();
    if (disk != undefined) { 
        hanoiCopy[to].push(disk);
    }
    let legal = true;
    hanoiCopy.forEach(pole => {
        if (pole.length > 0) {
            let topDisk = pole[pole.length - 1];
            pole.forEach(disk => {
                if (disk > topDisk) {
                    legal = false;
                }
            });
        }
    }
    );
    return legal;
}

app.get("/", (req,res) => {
    let message: string | undefined = undefined;
    if (typeof req.query.pole === "string") {
        let pole = parseInt(req.query.pole);
        if (from == -1) {
            from = pole;
        } else {
            to = pole;
        }
        if (from != -1 && to != -1) {
            if (isLegalMove(from, to)) {
                let disk = hanoi[from].pop();
                if (disk != undefined) { 
                    hanoi[to].push(disk);
                }
            } else {
                message = "Illegal move!";
            }
            from = -1;
            to = -1;
        }
        
    }
    
    res.render("index", {message: message, hanoi: hanoi});
});

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});