// require("dotenv").config();
// const axios = require("axios");
const express = require('express');
const cors = require("cors");
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager').v1;
const app = express();
const port = 3000;
const secretmanagerClient = new SecretManagerServiceClient();

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
    async function callAccessSecretVersion() {
        try {
            const request = {
                name: "projects/694909544055/secrets/API_KEY/versions/1",
            };
          
            const response = await secretmanagerClient.accessSecretVersion(request);
            console.log(response[1].payload.data);
        } catch (e) {
            console.log(e);
        }
    }
    callAccessSecretVersion();   

    res.send("test");
})

app.listen(port, () => {
    console.log('Go to http://localhost:3000/')
})