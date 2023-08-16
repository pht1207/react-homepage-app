import '../../../css/SettingsToggleSwitch.css'
import React, { useEffect } from "react";
import { SettingsContext } from './SettingsContext';
import { useContext } from 'react';


export default function SettingsToggleNewTabSwitch(props){
    const settingsContext = useContext(SettingsContext);

    const showInCelcius = settingsContext.showInCelcius;

    const handleClick = () => {
        //a is the previous state, it is being flipped (this is a toggle function for opening and closing the dropdown list)
        settingsContext.setShowInCelcius(a => !a);
    };

    useEffect(() => {
        localStorage.setItem('showInCelcius', settingsContext.showInCelcius);
    }, [settingsContext.showInCelcius])


    return(
        <div className='toggle'>
            <p>{props.name}</p>
            <label className="switch">
                <input 
                type="checkbox"
                checked={showInCelcius}
                onChange={handleClick}/>
                <span className="slider round"></span>
            </label>
        </div>
    );
}