// require("dotenv").config();
// const axios = require("axios");
const express = require('express');
const cors = require("cors");
const googleCloud = require("import secretmanager");
const app = express();
const port = 3000;

/* const getData = async () => {
    try {
        const baseURL = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.API_KEY}`

        const client = axios.create({
            baseURL: baseURL
        });

        const response = await client.get();
        return response;
    } catch (e) {
        console.log(e);
    }
} */

app.use(cors());

/* app.get('/', async (req, res) => {
    try {
        const response = await getData();
        res.send(response.data);
    } catch (e) {
        console.log(e);
    }
}) */

app.get('/', (req, res) => {
    secret_resource_name = "projects/694909544055/secrets/API_KEY/versions/1"
    response = gcp_secret_client.access_secret_version(secret_resource_name)
    secret_value = response.payload.data.decode('UTF-8')
    console.log(secret_value);
    res.send("test");
})

app.listen(port, () => {
    console.log('Go to http://localhost:3000/')
})