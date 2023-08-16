import './App.css';
import React, { useEffect } from "react";
import MyNavBar from './components/NavigationComponents/MyNavBar';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import { SettingsContext } from './components/NavigationComponents/MenuIcon/ListItemContent/SettingsContext';
import Settings from './components/NavigationComponents/MenuIcon/ListItemContent/Settings';
import ChangeBackground from './components/NavigationComponents/MenuIcon/ListItemContent/ChangeBackground';
import backgroundImagesPool from './components/NavigationComponents/MenuIcon/ListItemContent/ChangeBackgroundContent/backgroundImagesPool';
import ResetDiv from './components/ResetDiv';



function App() {
  const [userName, setUserName] = useState(localStorage.getItem('user'));
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('darkTheme') || 'light');
  //used in toggle switch for new tab on search in settings
  const [newTabToggle, setNewTabToggle] = useState(JSON.parse(localStorage.getItem('newTabToggle')) || false);

  //Used in displaying the changebackground page and change location page
  const [changeBackgroundVisible, setChangeBackgroundVisible] = useState(false);
  const [background, setBackground] = useState(localStorage.getItem('background') || backgroundImagesPool[4].src);
  const [customBackgroundURL, setCustomBackgroundURL] = useState(localStorage.getItem('customBackgroundURL'))


  //Used in weather data to show in celcius or fahrenheit
  const [showInCelcius, setShowInCelcius] = useState(JSON.parse(localStorage.getItem('showInCelcius')) || false);
  const [locationZip, setLocationZip] = useState(localStorage.getItem('userZipcode') || 75081);

  //Used in context provider to set the search bar to visible or not
  const [searchBarVisible, setSearchBarVisible] = useState(true);
  
  //Used in displaying the settings page and change location page
  const [settingsVisible, setSettingsVisible] = useState(false);

  const [dropDownClick, setDropDownClick] = useState(false);
  //Used in showing if weather is fetched without error or not
  const [weatherLoaded, setWeatherLoaded] = useState(false);

  const [validZip, setValidZip] = useState(false);
  




useEffect(() => {
  document.body.className = darkTheme;
  localStorage.setItem('darkTheme', darkTheme);
}, [darkTheme])


//Take a look at this for the dark mode stuff, it doesn't seem hard at all, just some reworking of my code
//https://www.makeuseof.com/how-to-add-dark-mode-to-a-react-application/
//scroll down to see them use localstorage, this is what i want to do

  return (
    <SettingsContext.Provider value={{userName, setUserName, darkTheme, setDarkTheme, dropDownClick, setDropDownClick, newTabToggle, setNewTabToggle, searchBarVisible, setSearchBarVisible, showInCelcius, setShowInCelcius, locationZip, setLocationZip, settingsVisible, setSettingsVisible, weatherLoaded, setWeatherLoaded, changeBackgroundVisible, setChangeBackgroundVisible, validZip, setValidZip, customBackgroundURL, setCustomBackgroundURL, background, setBackground}}>
      <div 
      className="App" 
      style={{ backgroundImage: `url(${background})`}}
      >
          <MyNavBar/>
          <SearchBar/>
          <Settings/>
          <ChangeBackground/>
          <ResetDiv/>
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
