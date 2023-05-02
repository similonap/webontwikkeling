import express from "express";
import { connect, createTweet, getProfileByHandle, getTweets, getTweetsByHandle, loadData } from "./db";
import {Profile, Tweet } from "./types";

const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended:true}));

app.get("", async(req,res) => {
    let tweets = await getTweets();
    return res.render("index", {
        tweets: tweets
    });
});

app.get("/:handle", async(req,res) => {
    const profile = await getProfileByHandle(req.params.handle);
    if (profile) {
        const tweets = await getTweetsByHandle(req.params.handle);
        res.render("profile", {
            tweets: tweets,
            profile: profile
        });
    } else {
        res.status(404).render("profile_not_found");
    }
});


app.post("/", async(req, res) => {
    const newTweet : Tweet = {
        handle: req.body.handle,
        name:  req.body.name,
        text: req.body.text,
        createdOn: new Date()
    }
    await createTweet(newTweet);
    let tweets = await getTweets();
    res.render("index", {
        tweets: tweets
    });
});

app.listen(3000, async() => {
    await connect();
    await loadData();
    console.log(`The application is listening on http://localhost:3000`);
})