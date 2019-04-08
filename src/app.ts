import express from "express";

// Create a new express application instance
const app: express.Application = express();
const port: number = 3000;

app.get("/", (req, res) => {
    res.send("Server is up");
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`);
});
