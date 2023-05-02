import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("port", 3000);

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

let timesCorrect = 0;
let timesWrong = 0;

const renderExercise = (res: express.Response, feedback: string | undefined) => {
    let operator = Math.floor(Math.random() * 2) ? "*" : "/";
    let number1 = Math.floor(Math.random() * 10);
    let number2 = operator == "*" ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 9) + 1;
    res.render("exercise", {timesCorrect, timesWrong, feedback: feedback, number1: operator == "/" ? number1 * number2 : number1, number2: number2, operator});
}

app.get("/", (req,res) => {
    renderExercise(res, undefined);
});

app.post("/", (req,res) => {
    let number1 = parseInt(req.body.number1);
    let number2 = parseInt(req.body.number2);
    let operator = req.body.operator;
    let userAnswer = req.body.result;

    let correct = false;
    let answer = 0;
    if(operator == "*"){
        answer = number1 * number2;
        correct = userAnswer == answer;
    }
    else{
        answer = number1 / number2;
        correct = userAnswer == answer;
    }
    if (correct) {
        timesCorrect++;
    } else {
        timesWrong++;
    }


    renderExercise(res, "The answer is " + answer + " and your answer is " + userAnswer + ". " + (correct ? "Correct!" : "Incorrect!"));
});


app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});