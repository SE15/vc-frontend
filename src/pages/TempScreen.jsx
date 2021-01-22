import React from "react";

import logo from '../assets/logo.png';
import { Route } from 'react-router-dom';

const TempScreen = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" />
            </header>
            
            <body>
                <a href="/login">Login</a><br />
                <a href="/signup">Signup</a><br />
                <a href="/home">Home</a><br />
                <a href="/settings">Settings</a><br />
                <a href="/search">Search</a><br />
            </body>
        </div>
    );
}


export default TempScreen;