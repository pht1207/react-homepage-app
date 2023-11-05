import React from "react";
import { useState, useContext, useEffect } from 'react';
import '../../css/WeatherIcon.css'
import { SettingsContext } from "../MenuIcon/ListItemContent/SettingsContext";


export default function WeatherIcon() {
  const settingsContext = useContext(SettingsContext);

  const [fetchLoading, setFetchLoading] = useState(true)
  const [temperature, setTemperature] = useState();
  const [imgSrc, setImgSrc] = useState()

  function getTemperature(temp){
    if(settingsContext.showInCelcius){
      return((temp-273.15).toFixed(1)+'°C')
    }
    else{
      return(((temp-273.15)*1.8+32).toFixed(1)+'°F');
    }
  }


  useEffect(() =>{
    localStorage.setItem('userZipcode', settingsContext.locationZip);
    getWeatherStats();
}, [settingsContext.locationZip])




async function getWeatherStats(){
  //Calls backend server function, sending the zip code and querying the openweatherAPI
  const resolvedFetch = await fetch('https://home.parkert.dev/backend/api/weather?zip='+settingsContext.locationZip);
  let fetchData = await resolvedFetch.json();
  setFetchLoading(false);
  //If returns any code (meaning an error), return nothing and do not set 'loaded' to true (showing an error where weather would be)
  if(fetchData["cod"]){
    settingsContext.setWeatherLoaded(false);
    settingsContext.setValidZip(false);
    return;
  }
  //If no error is returned, take variables from fetchData and set them to weaterData
  else{
    setTemperature((fetchData["current"]["temp"]));
    setImgSrc('https://openweathermap.org/img/wn/'+fetchData["current"]['weather']['0']['icon']+'.png')
    settingsContext.setValidZip(true);
  }
settingsContext.setWeatherLoaded(true);
}

  //If clicked, open up the settings menu and close all else
  const handleClick = () => {
    if(settingsContext.settingsVisible === false){
      settingsContext.setDropDownClick(false);
      settingsContext.setSearchBarVisible(false);
      settingsContext.setSettingsVisible(true);
      settingsContext.setChangeBackgroundVisible(false);
    }
    else{
    settingsContext.setDropDownClick(false);
    settingsContext.setSearchBarVisible(true);
    settingsContext.setSettingsVisible(false);
    settingsContext.setChangeBackgroundVisible(false)
    }
  };


  //Render this if no errors occur and api is called
  const loadedDiv = (
    <>
      <img
        className="weatherImage"
        src={imgSrc}
        alt="current weather reading"
      />
      <h1 className="temperatureReading">{getTemperature(temperature)}</h1>
    </>
  );

  //Render this if the api returns an error code
  const invalidZipCodeDiv = (
  <>
    {fetchLoading ? null : <h1 className="invalidZipCode" >{settingsContext.settingsVisible ? "Invalid zipcode" : "Click here to set a valid zipcode"}</h1>}
  </>
  );



  return (
    <div className="weatherIconDiv"
    onClick={handleClick}
    >
      {settingsContext.weatherLoaded ? loadedDiv : invalidZipCodeDiv}
    </div>
   );
}