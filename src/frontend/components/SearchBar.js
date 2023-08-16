import './css/SearchBar.css'
import { useState, useContext } from "react";
import { SettingsContext } from './NavigationComponents/MenuIcon/ListItemContent/SettingsContext';

export default function MyNavBar() {
    const [inputValue, setInputValue] = useState('');
    


    //value of the context
    let settingsContext = useContext(SettingsContext);
    const userName = settingsContext.userName;
    const showSearchBar = settingsContext.searchBarVisible;
    const newTabToggle = settingsContext.newTabToggle;


    function handleChange(e) {
        setInputValue(e.target.value); //Sets the event (the user input) to be added into the input
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(newTabToggle === false){//Opens search in new tab
            setInputValue("");//Resets the value inside the search bar
            window.open("https://www.google.com/search?q="+inputValue);
        }
        else{//Opens search in current tab
            window.open("https://www.google.com/search?q="+inputValue, "_self");
        }
    }

    const searchBar = (
    <div className='SearchDiv'>
        <form onSubmit={handleSubmit}>
            {userName ? <h1>Hello {userName}!</h1> : <h1>Welcome to the page!</h1>}
            <label>
                <input
                name='search input'
                type='text'
                placeholder='Type your search here'
                value={inputValue} /*This is the value inside the input box */
                onChange={handleChange} /*If input is changed, 'onChange' calls the 'handleChange' function above*/
                />
            </label>
        </form>
    </div>
    );

    return(
        <>
        {showSearchBar ? searchBar : null}
        </>
    );
}
