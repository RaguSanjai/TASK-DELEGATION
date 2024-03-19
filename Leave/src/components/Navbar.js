import React from 'react'
import { NavLink } from 'react-router-dom';
import unnamed from '../assets/unnamed.png'
import '../styles/nav.css'
import { useAuth } from './Auth';

export const NavBar = () => {
    const context = useAuth()
  return (
    <div className="nav-container" data-aos="fade-down" >
            <div className ="logo">
                <img className= "logoimg" alt= "logo" src={unnamed}/>
                <h2 className = "title">Task deligation system</h2>
            </div>
            <ul className = "navbar">
                <div className = "it">
                  
                </div>
                <li className="list item3"><NavLink className = "items" to="/login" >Login</NavLink></li>               
            </ul>
        </div>
  )
}
