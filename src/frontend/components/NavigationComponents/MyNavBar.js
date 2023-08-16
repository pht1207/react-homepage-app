import Nav from 'react-bootstrap/Nav';
import '../css/MyNavBar.css'
import MenuIcon from './MenuIcon/MenuIcon'
import WeatherIcon from './Weather/WeatherIcon'
import React from "react";



export default function MyNavBar() { 

  return (
    <Nav className='Navbar'>
        <MenuIcon />
        <WeatherIcon />
    </Nav>
)
}
