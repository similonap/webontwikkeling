import express from "express";
import cookieParser from 'cookie-parser';


const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {
    let currentCount;
    if (req.cookies.visitCount) {
        currentCount = parseInt(req.cookies.visitCount) + 1;
    } else {
        currentCount = 1;
    }
    res.cookie("visitCount", currentCount);
    res.send("You have visited this page " + currentCount + " times.");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});