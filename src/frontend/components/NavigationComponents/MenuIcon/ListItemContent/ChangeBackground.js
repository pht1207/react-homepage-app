import '../../../css/ChangeBackground.css'
import '../../../SearchBar';
import { useState, useContext, useMemo } from 'react';
import { SettingsContext } from './SettingsContext';
import backgroundImagesPool from './ChangeBackgroundContent/backgroundImagesPool';

export default function ChangeBackground(){
    let settingsContext = useContext(SettingsContext);
    const [invalidURL, setInvalidURL] = useState(false);

    const handleClick = (e) => {
        settingsContext.setBackground(backgroundImagesPool[e].src)
        localStorage.setItem('background', backgroundImagesPool[e].src);
      };
    
    let url;
    function handleNameChange(e){
        url = e.target.value
        if(e.target.value.length === 0){
            //If the user clears their custom URL, allow them, don't set invalidURL to true.
            localStorage.setItem('customBackgroundURL', '')
            localStorage.setItem('background', '')
            settingsContext.setCustomBackgroundURL('')
        }
        else{isImage(url)} //Checks to see if the input value is a valid image
    }

    function handleSubmit(e){
        e.preventDefault();
        url = e.target[0].value;
        isImage(url)
    }

    //Called to make sure the user-selected URL returns an image
    function isImage(url){        
        let image = new Image();
        image.onload = function() {
         if (this.width > 0) {
           setInvalidURL(false);
           settingsContext.setBackground(url);
           localStorage.setItem('background', url);
           localStorage.setItem('customBackgroundURL', url);
           settingsContext.setCustomBackgroundURL(url);
         }
       }
       image.onerror = function() {
           setInvalidURL(true);
       }
       image.src = url;
    }


    //Creates an array of <img> elements
    const backgroundList = backgroundImagesPool.map((background, index) => 
                <img 
                src={backgroundImagesPool[index].src} 
                key={background.src} 
                className='backgroundListItems'
                onClick={() => handleClick(index)}
                alt=''
                />
    );


    const changeBackgroundDiv = (
        <div className="changeBackgroundDiv">
            <h2>Change Background</h2>
            <form className='backgroundForm' onSubmit={handleSubmit}>
                <ul>
                        <p>Custom background URL: </p>
                        <input type='text' className='backgroundURLInput' placeholder='Enter an image URL here' onChange={handleNameChange} defaultValue={settingsContext.customBackgroundURL} style={{borderColor: invalidURL? "red": ""}}/>
                        <button type='submit' className='backgroundFormSubmit'>Set</button>
                </ul>
                <ul className='backgroundImages'>{backgroundList}</ul>
            </form>
        </div>
    );

    return(
        <div>
            {settingsContext.changeBackgroundVisible ? changeBackgroundDiv : null}
        </div>
    );
}