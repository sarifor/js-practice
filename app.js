// require("dotenv").config();
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
            name: "projects/694909544055/secrets/API_KEY/versions/2",
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
        // const dataArray = [];
        const result = await getData();
        console.log(result.data.articles);
        /* for (output in response) {
            dataArray.push(JSON.stringify(output));
        }
        console.log(dataArray); */
        res.send("test");
    } catch (e) {
        console.log(e);
    }
})

app.listen(port, () => {
    console.log('Go to http://localhost:3000/')
})