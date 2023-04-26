const axios = require("axios");
const express = require('express');
const cors = require("cors");
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager').v1;
const app = express();
const port = 3000;
const secretmanagerClient = new SecretManagerServiceClient();

let API_KEY;

const getData = async () => {
    try {
        const baseURL = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=${API_KEY}`
        const client = axios.create({
            baseURL: baseURL
        });

        const response = await client.get();
        return response;
    } catch (e) {
        console.log(e);
    }
}

app.use(cors());

async function callAccessSecretVersion() {
    try {
        const request = {
            name: "projects/493842336457/secrets/newsapi_key/versions/1",
        };
        const response = await secretmanagerClient.accessSecretVersion(request);
        API_KEY = response[0].payload.data.toString('utf-8'); // index starts from 0
        console.log(API_KEY);
    } catch (e) {
        console.log(e);
    }
}
callAccessSecretVersion();

app.get('/', async (req, res) => {
    try {
        const result = await getData();
        res.send(result.data.articles);
    } catch (e) {
        console.log(e);
    }
})

app.listen(port, () => {
    console.log('Go to http://34.27.35.62:3000/')
})