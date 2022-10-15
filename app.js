require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const { Pool, Client } = require('pg')
const pool = new Pool()


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {

    const resdb = await pool.query('SELECT * from users')
    await pool.end()
    console.log(resdb.rows)

    const data = {
            kelompok : 3,
    }
    res.status(200).json({'Final Project 1 Hactiv8':data});
});

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});