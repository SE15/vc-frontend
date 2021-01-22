import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TempScreen from './TempScreen';
import ProfileSettings from './ProfileSettings';
import Home from './Home';

const Main = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <TempScreen />
                </Route>
                <Route path="/settings" exact>
                    <ProfileSettings />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Main;

