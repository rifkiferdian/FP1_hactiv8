const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    const data = {
            kelompok : 3,
    }
    res.status(200).json({'Final Project 1 Hactiv8':data});
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});