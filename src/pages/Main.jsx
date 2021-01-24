import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TempScreen from './TempScreen';
import ProfileSettings from './ProfileSettings';
import Profile from './Profile';
import Login from './Login';
import SignUp from './SignUp';
import Logout from './Logout';
import Delete from '../popups/DeleteAccount'
import Change from '../popups/ChangePassword'

const Main = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <TempScreen />
            </Route>
            <Route path="/delete" exact>
                <Delete />
            </Route>
            <Route path="/change" exact>
                <Change />
            </Route>
            <Route path="/home" exact>
                <Profile button="0" />
            </Route>
            <Route path="/settings" exact>
                <ProfileSettings />
            </Route>
            <Route path="/profile">
                <Profile button="3" />
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/signup" exact>
                <SignUp />
            </Route>
            <Route path="/logout" exact>
                <Logout />
            </Route>
        </Switch>
    );
}

export default Main;
