import React from "react";

import logo from '../assets/logo.png';

import {Image} from '@chakra-ui/react';

const TempScreen = () => {
    return (
        <div className="App">
            <header className="App-header">
                <center>
                <Image 
                src = {logo}
                htmlWidth = "300px"
                />
                </center>
            </header>
            
            <body>
                <a href="/login">Login</a><br />
                <a href="/home">Home</a><br />
                <a href="/settings">Settings</a><br />
                <a href="/search">Search</a><br />
            </body>
        </div>
    );
}


export default TempScreen;