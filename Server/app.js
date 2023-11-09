import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv'
config();

const app = express();

// Pre Routes Made by The Express...................


app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/ping', (req, res) => {
    res.send('/pong');
});

// Routes for 3 Module

// If someone gives other than these 3 routes, then give an "Ooops !!! 404 page not found" error.
app.all('*', (req, res) => {
    res.status(404).send("Ooops !!! 404 page not found");
});

export default app;
