const { json } = require("express/lib/response");

//Used for https insantiation
const https = require('https')
const fs = require('fs');

const express = require("express");
const app = express();
// create our express app
const port = 5003;
const apiKey = "your id"

//Variables for the weather fetching
let weatherStats;
let location;
let zip;


app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });

//Whenever localhost:8080/api/weather is called, this is ran
//This function allows access to the req and res object. Res is incoming, req is data we are sending to the client
app.get('/api/weather', async (req, res) => {
        //Gets the zip code from the get request URL
        zip = req.query.zip;
        await getCoordinates();
        if(location['zip']){
                await getWeatherData();
                res.status(200).send(weatherStats)
        }
        else{
                res.status(404).send(location)
        }
});




async function getCoordinates(){
        const url = 'https://api.openweathermap.org/geo/1.0/zip?zip='+zip+'&appid='+{apiKey}
        const response = await fetch(url);
        location = await response.json();
}

async function getWeatherData(){
        const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+location.lat+'&lon='+location.lon+'&exclude={part}&appid='+{apiKey};

        const response = await fetch(url);
        weatherStats = await response.json();
}


