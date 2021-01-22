import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TempScreen from './TempScreen';
import ProfileSettings from './ProfileSettings';
import Profile from './Profile';
import Login from './Login';
import SignUp from './SignUp';

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
                <Route path="/profile" exact>
                    <Profile />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/signup" exact>
                    <SignUp/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Main;
