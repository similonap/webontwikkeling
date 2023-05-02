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
    return res.render("index");
});

app.get("/TheLichKing", async(req,res) => {
    res.render("profile");
});

app.listen(3000, async() => {
    try {
        await connect();
        await loadData();
    } catch (e) {
        console.log("MongoDB connection failed. Check your connection string.");
    }
    console.log(`The application is listening on http://localhost:3000`);
})