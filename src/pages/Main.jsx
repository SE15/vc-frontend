import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TempScreen from './TempScreen';
import ProfileSettings from './ProfileSettings';
import Profile from './Profile';
import Login from './Login';
import SignUp from './SignUp';

const Main = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <TempScreen />
            </Route>
            <Route path="/home" exact>
                <Profile button="0" />
            </Route>
            <Route path="/settings" exact>
                <ProfileSettings />
            </Route>
            <Route path="/profile">
                <Profile button="1" />
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/signup" exact>
                <SignUp />
            </Route>
        </Switch>
    );
}

export default Main;
