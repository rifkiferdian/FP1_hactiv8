require('dotenv').config()
const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/UserController");
const ReflectionsController = require("./controllers/ReflectionsController");
const authentication = require('./middlewares/authentication');
const authorization = require('./middlewares/authorization');
const app = express();
const { Pool, Client } = require('pg')
const pool = new Pool()


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
    const data = {
            kelompok : 3,
    }
    res.status(200).json({'Final Project 1 Hactiv8':data});
});

app.post("/api/v1/users/login", UserController.login);
app.post("/api/v1/users/register", UserController.register);
// Route register disini

app.use('/api/v1/reflections', authentication);
app.get("/api/v1/reflections/:id", authorization, ReflectionsController.getReflections);
app.delete("/api/v1/reflections/:id", authorization, ReflectionsController.delReflections);
// Tambahkan routes reflection dibawah sini

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});