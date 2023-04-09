const axios = require("axios")
const express = require('express')
const { YOUTUBE_API_KEY } =require('./apikeys.js')
const app = express()
const port = 3000

console.log(YOUTUBE_API_KEY);

const getData = async () => {
    const baseURL = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=" + YOUTUBE_API_KEY + "&videoId=Z9eqBrp_uR0&maxResults=3";

    const client = axios.create({
        baseURL: baseURL
    });

    const response = await client.get();
    console.log(response); // Cannot see the comments fetched
}

app.get('/', (req, res) => {
    getData();
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('Go to http://localhost:3000/')
})