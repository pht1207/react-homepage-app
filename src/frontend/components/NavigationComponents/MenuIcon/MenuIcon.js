import React from "react";
import { useContext } from 'react';
import '../../css/MenuIcon.css'
import MenuList from './MenuList'
import { SettingsContext } from "./ListItemContent/SettingsContext";


export default function MenuIcon() {
  const settingsContext = useContext(SettingsContext);




  const handleClick = () => {
    //a is the previous state, it is being flipped (this is a toggle function for opening and closing the dropdown list)
    settingsContext.setSettingsVisible(false);
    settingsContext.setChangeBackgroundVisible(false)
    settingsContext.setDropDownClick(a => !a);
    if(settingsContext.searchBarVisible === false){
      settingsContext.setSearchBarVisible(true);
    }
  };


  return (
      <div className="MenuIconDiv">
          {settingsContext.dropDownClick ? <MenuList/> : null}      
        <svg      
        onClick={handleClick}
        style={{width:"2em", height:"2em", display:"block"}}
            className="menuIcon"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 300 310"
            preserveAspectRatio="xMidYMid meet"

            
          >
            <g transform="translate(10.016 -803.031)">
              <g
                fill="none"
                stroke="#FFF"
                strokeDasharray="none"
                strokeLinecap="round"
                strokeLinejoin="miter"
                strokeMiterlimit="4"
                strokeOpacity="1"
                strokeWidth="50"
              >
                <path d="M19.668 1032.694h250.646"></path>
                <path d="M19.668 932.694h250.646"></path>
                <path d="M19.668 832.694h250.646"></path>
              </g>
            </g>
        </svg>
      </div>
   );
}

