import express = require('express');
import {Application} from 'express';
import bodyParser from "body-parser";
import {authRouter, mailRouter, userRouter} from "./controllers";
import {connectToDatabase} from "./infrastructure/database";
import {loggerMiddleware, errorMiddleware} from "./middlewares";
const {port} = require('./dotenv/config');

const app: Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/mail', mailRouter)
app.use(errorMiddleware)

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`API listening on port: ${port}`);
        });
    })
