import express from "express";

const app = express();

app.set("port", 3000);

app.get("/:operator", (req,res) => {
    let operator = req.params.operator;

    if (typeof req.query.a == "string" && typeof req.query.b == "string") {
        let a = parseInt(req.query.a);
        let b = parseInt(req.query.b);

        switch (operator) {
            case "mult":
                res.json({result: a*b});
                return;
        }
    }
    


    res.json({error: "Something went wrong"});
})

app.listen(app.get("port"), () => {
    console.log("The app started at http://localhost:" + app.get("port"));
});