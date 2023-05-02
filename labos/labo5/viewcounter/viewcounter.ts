import express from "express";

const app = express();

interface VisitorCountPerPath {
    [path: string]: number;
}

let visitorCount = 0;
let visitorCountPerPath : VisitorCountPerPath= {};

app.use((req, res) => {
    visitorCount++;
    visitorCountPerPath[req.path] = (visitorCountPerPath[req.path] || 0) + 1;
    res.contentType("text/html");
    res.send(`<html>
                <body>
                    <ul>
                        <li>Total visits: ${visitorCount}</li>
                        ${
                            Object.keys(visitorCountPerPath).map(path => {
                                return `<li>Visits to ${path}: ${visitorCountPerPath[path]}</li>`;
                            }).join("")
                        }
                    </ul>
                </body>
              </html>`);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
