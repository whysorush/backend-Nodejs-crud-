// const express = require("express");
import express from "express";
import { PORT, mongoDbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoutes.js'
import cors from 'cors';

const app = express();

    app.use(express.json());

app.use(cors());
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:['GET'],
//     allowedHeaders:['Content-type']
// }))

app.get('/', (req, res) => {
    console.log("Hello World");
    return res.status(200).send("welcome to book store")
});

app.use('/books',booksRoute)


mongoose.connect(mongoDbURL)
    .then(() => {

        console.log("connected to mongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })




