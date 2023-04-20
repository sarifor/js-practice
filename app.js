require("dotenv").config();
const axios = require("axios");
const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

const getData = async () => {
    const baseURL = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.API_KEY}`

    const client = axios.create({
        baseURL: baseURL
    });

    const response = await client.get();
    return response;
}

app.use(cors());

app.get('/', async (req, res) => {
    const response = await getData();
    res.send(response.data);
})

app.listen(port, () => {
    console.log('Go to http://localhost:3000/')
})