import React from "react";
import { useState, useContext } from 'react';
import '../../css/ListItem.css'
import { SettingsContext } from "./ListItemContent/SettingsContext";



export default function ListItem(props){

    let settingsContext = useContext(SettingsContext);

    const [isHover, setIsHover] = useState(false);

    
    const handleMouseEnter = () => {
        setIsHover(true);
    }; 
    const handleMouseLeave = () => {
        setIsHover(false);
    };  


    //Handles clicks of the list items
    const handleClick = () => {
        settingsContext.setDropDownClick(a => !a);
      //a is the previous state, it is being flipped (this is a toggle function for opening and closing the dropdown list)
        if(props.itemName === 'Dark Mode'){
            settingsContext.setDarkTheme(a => !a);
            if(settingsContext.darkTheme === 'light'){
                settingsContext.setDarkTheme('dark');
            }
            else{
                settingsContext.setDarkTheme('light');
            }
        }
        else if(props.itemName === 'Settings'){
            //hides the search bar when settings is shown
            if(settingsContext.settingsVisible === false)
            {
                settingsContext.setSearchBarVisible(false);
                settingsContext.setChangeBackgroundVisible(false);
                settingsContext.setSettingsVisible(true);
            }
            else{
                settingsContext.setSettingsVisible(false);
                settingsContext.setChangeBackgroundVisible(false);
                settingsContext.setSearchBarVisible(true);
            }
        }   
        else if(props.itemName === 'Change Background'){
            if(settingsContext.changeBackgroundVisible === false)
            {
                settingsContext.setSettingsVisible(false);
                settingsContext.setSearchBarVisible(false);
                settingsContext.setChangeBackgroundVisible(true)
            }
            else{
                settingsContext.setSettingsVisible(false);
                settingsContext.setChangeBackgroundVisible(false);
                settingsContext.setSearchBarVisible(true);

            }
        }          
    };    


    return(
        <li className="listItem"
        style={{cursor: isHover ? 'pointer': 'normal'}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}>
            {props.itemName}
        </li>
    );
}
