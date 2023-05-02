import express from "express";
import cookieParser from 'cookie-parser';
import session  from 'express-session';

declare module "express-session" {
    interface Session {
      visitCount: number;
    }
}

const app = express();

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        "httpOnly": true,
    }
}))

app.get("/", (req, res) => {
    let currentCount;
    if (req.session.visitCount) {
        currentCount = req.session.visitCount + 1;
    } else {
        currentCount = 1;
    }
    req.session.visitCount = currentCount;
    res.send("You have visited this page " + currentCount + " times.");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});