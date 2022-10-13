require('dotenv').config()
const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/UserController");
const authentication = require('./middlewares/authentication');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    const data = {
            kelompok : 3,
    }
    res.status(200).json({'Final Project 1 Hactiv8':data});
});

app.post("/api/v1/users/login", UserController.login);
// Route register disini

app.use('/api/v1/reflections', authentication);
// Tambahkan routes reflection dibawah sini

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});