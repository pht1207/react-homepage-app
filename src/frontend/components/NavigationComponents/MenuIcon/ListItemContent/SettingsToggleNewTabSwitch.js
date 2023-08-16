import '../../../css/SettingsToggleSwitch.css'
import React, { useEffect } from "react";
import { SettingsContext } from './SettingsContext';
import { useContext } from 'react';


export default function SettingsToggleNewTabSwitch(props){
    const settingsContext = useContext(SettingsContext);

    const newTabToggle = settingsContext.newTabToggle;

    const handleClick = () => {
        //a is the previous state, it is being flipped (this is a toggle function for opening and closing the dropdown list)
        settingsContext.setNewTabToggle(a => !a);
    };

    useEffect(() => {
        localStorage.setItem('newTabToggle', settingsContext.newTabToggle);
    }, [settingsContext.newTabToggle])


    return(
        <div className='toggle'>
            <p>{props.name}</p>
            <label className="switch">
                <input 
                type="checkbox"
                checked={!newTabToggle}
                onChange={handleClick}/>
                <span className="slider round"></span>
            </label>
        </div>
    );
}
