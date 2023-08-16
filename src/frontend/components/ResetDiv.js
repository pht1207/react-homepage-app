import './css/SearchBar.css'
import {  useContext } from "react";
import { SettingsContext } from './NavigationComponents/MenuIcon/ListItemContent/SettingsContext';

export default function MyNavBar() {
    
    //value of the context
    let settingsContext = useContext(SettingsContext);
    const showSearchBar = settingsContext.searchBarVisible;

    function handleClick(){
        settingsContext.setSettingsVisible(false);
        settingsContext.setChangeBackgroundVisible(false)
        settingsContext.setSearchBarVisible(true)
    }

    const ResetDiv = (
        <div className='ResetDiv' onClick={handleClick} style={{zIndex: 0, width: '100%', height: '100%'}}/>
    );

    return(
        <>
        {showSearchBar ? null : ResetDiv}
        </>
    );
}
