import '../../../css/Settings.css'
import SettingsToggleSwitch from './SettingsToggleNewTabSwitch';
import SettingsToggleCelciusView from './SettingsToggleCelciusView';
import '../../../SearchBar';
import { useContext, useState } from 'react';
import { SettingsContext } from './SettingsContext';

export default function Settings(){
    let settingsContext = useContext(SettingsContext);
    const [val, setVal] = useState(settingsContext.locationZip);

    

    function handleNameChange(e){
        settingsContext.setUserName(e.target.value);
        localStorage.setItem('user', e.target.value);
    }

    function handleZipChange(e){
        setVal(e.target.value.replace(/[^0-9]/g, "")) //Allows only digits to be inserted
        const regex = /^[0-9\b]{5}$/; //Tests if the input is a digit and is a length of five
        if(regex.test(e.target.value)){
            settingsContext.setLocationZip(e.target.value);
            localStorage.setItem('userZipcode', settingsContext.locationZip);
        }
    }

    const settingsDiv = (
    <div className="Settings">
    <h2>Settings</h2>
    <form className='settingsForm' onSubmit={e => e.preventDefault()}>
        <ul>
            <li>
                <p>Enter your name: </p>
                <input type='text' className='NameInput' onChange={handleNameChange} defaultValue={settingsContext.userName}/>
            </li>
            <li>
                <p>Enter a 5 digit zipcode for custom weather stats:</p>
                <input inputMode='numeric' value={val} className='NameInput' maxLength={5} pattern="[0-9]*" onChange={handleZipChange} style={ { border: settingsContext.validZip ? '' : ".1em solid red" } }/>
            </li>
            <li>
                <SettingsToggleCelciusView
                name='View Temperature in Celcius?'
            />
            </li>
            <li>
                <SettingsToggleSwitch
                name='Open new tab on search?'
            />
            </li>                        
        </ul>
    </form>
</div>);

    return(
        <div>
            {settingsContext.settingsVisible ? settingsDiv : null}
        </div>
    );
}