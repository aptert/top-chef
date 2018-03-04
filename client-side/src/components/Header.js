import React, { Component } from 'react';
import logo from './food.png';
import './Header.css';

class Header extends React.Component{
    render(){
        return(
        <header className="Header-header">
            <img src={logo} className="Header-logo" alt="logo" />
            <h1 className="Header-title">We have a deal !</h1>
        </header>
        );
    }
}

export default Header